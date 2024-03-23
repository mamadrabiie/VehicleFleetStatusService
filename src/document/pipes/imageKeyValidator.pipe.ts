import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ImageKeyValidatorPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (value.split('/').length != 2)
      throw new BadRequestException('provide valid imagekey');
    return value;
  }
}
