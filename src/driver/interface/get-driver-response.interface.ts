import { ApiResponseProperty } from '@nestjs/swagger';
import OKBaseResponse from '../../interfaces/ok-base-response.interface';
import { Driver } from '../driver.model';

export class GetDriverResponse extends OKBaseResponse {
  @ApiResponseProperty({
    example: [
      {
        phoneNumber: 'string',
        name: 'string',
        lisenseNumber: 'string',
        userId: 'string',
        keyImDrive: 'string',
      },
    ],
  })
  driver: Driver[];
}
