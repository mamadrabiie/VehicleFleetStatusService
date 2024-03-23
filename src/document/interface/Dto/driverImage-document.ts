import { ApiProperty } from '@nestjs/swagger';

export class DriverImgdto {
  @ApiProperty({ type: String, description: 'imageName' })
  driverId: string;
  @ApiProperty({ type: String, description: 'imageName' })
  imageName: string;
}
