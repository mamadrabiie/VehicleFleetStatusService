import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatUserDto } from './Dto/user-creatuser-dto';
import { otpVerifyDto } from './Dto/otp-verify-dto';
import { User } from './user.model';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { Jwpayload } from './jwt-payload-interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async creatUser(creatUserdto: CreatUserDto) {
    const { username, phoneNumber } = creatUserdto;

    const user = new this.UserModel({
      username,
      phoneNumber,
      registerTime: new Date(),
    });
    try {
      await user.save();
    } catch (error) {
      if (error.code == '11000') {
        throw new ConflictException('username is exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(phoneNumber: string): Promise<{
    otpHash: string;
    phoneNumber: string;
  }> {
    if (!(await this.UserModel.exists({ phoneNumber })))
      throw new NotFoundException('User Not Found');
    const otpGenerator = require('otp-generator');
    const key = this.configService.get('OTP_SECRET_KEY');
    const ttl = parseInt(this.configService.get('OTP_TTL'));
    let otp: any;

    
    otp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    
    await console.log(otp); 
    const expires = Date.now() + ttl;
    const data = `${phoneNumber}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256', key).update(data).digest('hex');
    const fullHash = `${hash}.${expires}`;
    return {
      otpHash: fullHash,
      phoneNumber,
    };
  }

  verify(otpVerifyDto: otpVerifyDto): { accessToken: string } {
    const { phoneNumber } = otpVerifyDto;
    try {
      const key = this.configService.get('OTP_SECRET_KEY');
      const [hashValue, expires] = otpVerifyDto.otpHash.split('.');
      if (Date.now() > parseInt(expires)) {
        throw new UnauthorizedException('expired');
      }
      const data = `${otpVerifyDto.phoneNumber}.${otpVerifyDto.otp}.${expires}`;
      const newCalculatedHash = crypto
        .createHmac('sha256', key)
        .update(data)
        .digest('hex');
      if (newCalculatedHash === hashValue) {
        const payload: Jwpayload = { phoneNumber };
        const accessToken: string = this.jwtService.sign(payload);
        return { accessToken };
      }
      throw new UnauthorizedException('invalid_credentials | expired');
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
