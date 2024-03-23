import { ApiResponseProperty } from '@nestjs/swagger';
import OKBaseResponse from '../../interfaces/ok-base-response.interface';

export class GetImageUrlResponse extends OKBaseResponse {
  @ApiResponseProperty({
    example: ['https://aws.com'],
  })
  url: string;
}
