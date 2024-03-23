import { ApiResponseProperty } from '@nestjs/swagger';
import OKBaseResponse from '../../interfaces/ok-base-response.interface';
import { CarInterface } from '../cars.model';

export class GetCarResponse extends OKBaseResponse {
  @ApiResponseProperty({
    example: [
      {
        color: 'string',
        numberPlate: 'string',
        engineNumber: 'string',
        bodyNumber: 'string',
        brand: 'string',
        model: 'string',
        Km: 0,
        insurance: {
          start: 'string',
          finish: 'string',
          number: 'string',
        },
        userId: 'string',
        keyImCar: 'string',
      },
    ],
  })
  cars: CarInterface[];
}
