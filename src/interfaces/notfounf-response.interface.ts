import { ApiResponseProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiResponseProperty({
    example: 404,
  })
  statusCode: number;
}
