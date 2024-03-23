import { ApiResponseProperty } from "@nestjs/swagger";

export default class OKBaseResponse {
  @ApiResponseProperty({
    example:200
  })
  statusCode: number
}