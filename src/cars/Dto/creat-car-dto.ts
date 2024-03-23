import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatCardto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Color' })
  color: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'NumberPlate' })
  @IsString()
  numberPlate: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'engineNumber' })
  @MinLength(7)
  @MaxLength(7)
  engineNumber: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'bodyNumber' })
  @MinLength(7)
  @MaxLength(7)
  bodyNumber: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'brand' })
  brand: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'model' })
  @MinLength(4)
  @MaxLength(4)
  model: string;
  @IsNumberString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Km' })
  Km: number;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'insuranceStart' })
  // @Matches(/^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/, {
  //   message: 'insuranceStart  is too weak',
  // })
  insuranceStart: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'insuranceFinish' })
  // @Matches(/^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/, {
  //   message: 'insuranceFinish  is too weak',
  // })
  insuranceFinish: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'insuranceNumber' })
  insuranceNumber: string;
}

export class UpdateCarDto extends PartialType(CreatCardto) {}
