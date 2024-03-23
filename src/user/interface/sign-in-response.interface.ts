import { ApiResponseProperty } from "@nestjs/swagger";
import OKBaseResponse from "../../interfaces/ok-base-response.interface";

export class SignInResponse extends OKBaseResponse  {
  @ApiResponseProperty({
    example:'string'
  })
  otpHash: string

  @ApiResponseProperty({
      example:'string'
  })
  phoneNumber: string
}
  