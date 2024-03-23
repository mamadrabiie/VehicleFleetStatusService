import {
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ForbiddenResponse } from '../interfaces/fornidden-response.interface';
import { GetUser } from '../user/get-user.decorator';
import { DocumentService } from './document.service';
import { GetImageUrlResponse } from './interface/document.getImageurl-response';
import { ImageKeyValidatorPipe } from './pipes/imageKeyValidator.pipe';

@ApiTags('Image')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('images')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @ApiQuery({
    name: 'imageKey',
    description: 'imageKey',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'download url',
    type: GetImageUrlResponse,
  })
  @ApiForbiddenResponse({ description: 'Forbidden', type: ForbiddenResponse })
  @Get()
  async getImageByKey(
    @Query('imageKey', ImageKeyValidatorPipe) imageKey: string,
    @GetUser() userId: string,
  ) {
    if (imageKey.split('/')[0] != userId) throw new ForbiddenException();
    const url = this.documentService.createGetPreSignedUrl(imageKey);
    return {
      status: HttpStatus.OK,
      url,
    };
  }
}
