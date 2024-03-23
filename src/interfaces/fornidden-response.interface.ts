import { ApiResponseProperty } from '@nestjs/swagger';

export class ForbiddenResponse {
  @ApiResponseProperty({
    example: 403,
  })
  statusCode: number;
}
