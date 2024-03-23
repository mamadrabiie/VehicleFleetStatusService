import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Jwpayload } from './jwt-payload-interface';
import { User } from './user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {
    super({
      secretOrKey: 'hardcodedsecretkey', // this should be in env file
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: Jwpayload): Promise<User> {
    const { phoneNumber } = payload;
    const user = await this.UserModel.findOne({ phoneNumber });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
