import { ApiResponseProperty } from "@nestjs/swagger";

export class InvalidLoginResponse {
  @ApiResponseProperty({
    example:401
  })
  statusCode: number

  @ApiResponseProperty({
    example:'invalid_credentials | expired'
  })
  message: string
}