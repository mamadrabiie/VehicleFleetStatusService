import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CreatUserDto } from './Dto/user-creatuser-dto';
import { otpVerifyDto } from './Dto/otp-verify-dto';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SingInUserDto } from './Dto/user-singIn-dto';
import { SignUpResponse } from './interface/sign-up-response.interface';
import { SignInResponse } from './interface/sign-in-response.interface';
import { InvalidLoginResponse } from './interface/invalid-login-response.interface';
import { VerifyLoginResponse } from './interface/verify-login.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userservice: UserService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'User Signed Up',
    type: SignUpResponse,
  })
  @ApiBody({ type: CreatUserDto })
  async singUp(@Body() creatuserdto: CreatUserDto) {
    await this.userservice.creatUser(creatuserdto);
    const { otpHash, phoneNumber } = await this.userservice.signIn(
      creatuserdto.phoneNumber,
    );
    return {
      statusCode: HttpStatus.CREATED,
      otpHash,
      phoneNumber,
    };
  }

  @Post('/signin')
  @ApiOkResponse({
    description: 'User Login',
    type: SignInResponse,
  })
  @ApiNotFoundResponse({
    description: 'User Not Found',
    type: NotFoundException,
  })
  @ApiBody({ type: SingInUserDto })
  async signIn(@Body() SingInUserDto: SingInUserDto) {
    const { otpHash, phoneNumber } = await this.userservice.signIn(
      SingInUserDto.phoneNumber,
    );
    return {
      statusCode: HttpStatus.OK,
      otpHash,
      phoneNumber,
    };
  }

  @Post('/verify')
  @ApiOkResponse({
    description: 'User Verify',
    type: VerifyLoginResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'verification failed',
    type: InvalidLoginResponse,
  })
  @ApiBody({ type: otpVerifyDto })
  verify(@Body() otpVerifyDto: otpVerifyDto) {
    const accessToken = this.userservice.verify(otpVerifyDto);
    return {
      statusCode: HttpStatus.OK,
      accessToken,
    };
  }
}
