import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatDriverdto {
  @IsString()
  @IsOptional()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty({ type: String, description: 'Phone Number' })
  @Matches(
    /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
    {
      message: 'PhoneNumber  is too weak',
    },
  )
  phoneNumber: string;
  @IsString()
  @IsOptional()
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'Name' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Lisense Number' })
  lisenseNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'imageName' })
  imageName: string;
}
export class UpdateCarDto extends PartialType(CreatDriverdto) {}
