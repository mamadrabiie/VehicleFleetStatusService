import { ApiResponseProperty } from '@nestjs/swagger';
import OKBaseResponse from '../../interfaces/ok-base-response.interface';
import { Driver } from '../driver.model';

export class GetDriverNameResponse extends OKBaseResponse {
  @ApiResponseProperty({
    example: [{
        name:'bob',
        _id: '1236537869786893'
      },{
        name:'alice',
        _id: '1236537869786893'
    }],
  })
  drivers: Driver[];
}
