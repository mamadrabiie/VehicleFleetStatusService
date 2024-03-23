import { ApiProperty } from '@nestjs/swagger';

export class CarImgdto {
  @ApiProperty({ type: String, description: 'carId' })
  carId: string;
  @ApiProperty({ type: String, description: 'imageName' })
  imageName: string;
}
