import { ApiResponseProperty } from "@nestjs/swagger";

export class VerifyLoginResponse {
  @ApiResponseProperty({
    example:'string'
  })
  accessToken: string
}
