import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class CreatUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ type: String, description: 'UserName' })
  username: string;

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Matches(
    /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/,
    {
      message: 'phoneNumber  is too weak',
    },
  )
  @ApiProperty({ type: String, description: 'phoneNumber' })
  phoneNumber: string;
}