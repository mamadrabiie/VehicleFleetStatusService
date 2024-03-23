import { ApiResponseProperty } from "@nestjs/swagger";

export class CreatedBaseResponse {
    @ApiResponseProperty({
      example:201
    })
    statusCode: number
}
  