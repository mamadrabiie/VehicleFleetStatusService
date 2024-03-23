import { ApiResponseProperty } from "@nestjs/swagger";
import { CreatedBaseResponse } from "../../interfaces/created-response.interface";

export class SignUpResponse extends CreatedBaseResponse {
    @ApiResponseProperty({
      example:'string'
    })
    otpHash: string

    @ApiResponseProperty({
        example:'string'
    })
    phoneNumber: string
}
  