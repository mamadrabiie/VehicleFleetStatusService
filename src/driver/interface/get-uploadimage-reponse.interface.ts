import { ApiResponseProperty } from '@nestjs/swagger';
import { CreatedBaseResponse } from '../../interfaces/created-response.interface';

export class UploadImageResponse extends CreatedBaseResponse {
  @ApiResponseProperty({
    example: 'https://aws.com',
  })
  url: string;
}
