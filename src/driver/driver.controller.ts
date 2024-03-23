import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedResponse } from '../interfaces/unauthorized-response.interface';
import { CreatedBaseResponse } from '../interfaces/created-response.interface';
import { GetUser } from '../user/get-user.decorator';
import { DriverService } from './driver.service';
import { CreatDriverdto } from './Dto/creat-driver-dto';
import { GetDriverResponse } from './interface/get-driver-response.interface';
import { GetDriverNameResponse } from './interface/get-drivername-response.interface';
import { NotFoundResponse } from '../interfaces/notfounf-response.interface';
import OKBaseResponse from '../interfaces/ok-base-response.interface';
import { DocumentService } from '../document/document.service';
import { DriverImage } from '../document/interface/upload-driver-image';
import { UploadImageResponse } from './interface/get-uploadimage-reponse.interface';
import { DriverImgdto } from '../document/interface/Dto/driverImage-document';
import { CreatDriverResponse } from './interface/creat-driver-response.interface';

@ApiTags('Driver')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiUnauthorizedResponse({
  description: 'Login Required',
  type: UnauthorizedResponse,
})
@Controller('driver')
export class DriverController {
  constructor(
    private driverservice: DriverService,
    private documentService: DocumentService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Driver Created',
    type: CreatDriverResponse,
  })
  @ApiBody({ type: CreatDriverdto })
  async creatDriver(
    @Body() creatdriverdto: CreatDriverdto,
    @GetUser() userId: string,
  ) {
    return {
      statusCode: HttpStatus.CREATED,
      url: await this.driverservice.creatDriver(creatdriverdto, userId),
    };
  }
  @Get()
  @ApiOkResponse({ description: 'Driver Found', type: GetDriverResponse })
  async findDriver(@GetUser() userId: string) {
    return {
      statusCode: HttpStatus.OK,
      drivers: await this.driverservice.findDriver(userId),
    };
  }
  @Get('/name')
  @ApiOkResponse({
    description: 'Driver Names Found',
    type: GetDriverNameResponse,
  })
  async findNameDriver(@GetUser() userId: string) {
    return {
      statusCode: HttpStatus.OK,
      drivers: await this.driverservice.findNameDriver(userId),
    };
  }
  @Patch('/:id')
  @ApiCreatedResponse({
    description: 'Driver Updated',
    type: CreatedBaseResponse,
  })
  @ApiBody({ type: CreatDriverdto })
  async updateDriver(
    @Param('id') id: string,
    @Body() creatdriverdto: CreatDriverdto,
    @GetUser() userId: string,
  ) {
    await this.driverservice.updateDriver(id, creatdriverdto, userId);
    return {
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get('/:driverId/:carId')
  @ApiOkResponse({
    description: 'assign is successful',
    type: OKBaseResponse,
  })
  @ApiNotFoundResponse({ description: 'Id NotFound', type: NotFoundResponse })
  async assignCarToDriver(
    @Param('driverId') driverId: string,
    @Param('carId') carId: string,
    @GetUser() userId: string,
  ) {
    await this.driverservice.assignCarToDriver(driverId, carId, userId);
    return {
      statusCode: HttpStatus.OK,
    };
  }
  @ApiBody({ type: DriverImgdto })
  @ApiNotFoundResponse({ description: 'Id NotFound', type: NotFoundResponse })
  @ApiCreatedResponse({
    description: 'upload file url',
    type: UploadImageResponse,
  })
  @Post('/images')
  async createPutPreSignedUrlByImageKey(
    @Body() driverImg: DriverImage,
    @GetUser() userId: string,
  ) {
    const imageKey = this.documentService.createDriverDocObjectKey(
      driverImg,
      userId,
    );
    await this.driverservice.updateImageKey(
      driverImg.driverId,
      userId,
      imageKey,
    );
    return {
      statusCode: HttpStatus.CREATED,
      url: await this.documentService.createPutPreSignedUrlByImageKey(imageKey),
    };
  }
}
