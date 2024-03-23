import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Res,
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
import { GetUser } from '../user/get-user.decorator';
import { CarInterface } from './cars.model';
import { CarsService } from './cars.service';
import { CreatCardto, UpdateCarDto } from './Dto/creat-car-dto';
import { CreatedBaseResponse } from '../interfaces/created-response.interface';
import { GetCarResponse } from './interface/get-car-response.interface';
import { UnauthorizedResponse } from '../interfaces/unauthorized-response.interface';
import { NotFoundResponse } from '../interfaces/notfounf-response.interface';
import { CarImage } from '../document/interface/upload-car-image';
import { DocumentService } from '../document/document.service';
import { UploadImageResponse } from './interface/get-uploadimage-response.interface';
import { CarImgdto } from '../document/interface/Dto/carImage-document';

@ApiTags('Car')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiUnauthorizedResponse({
  description: 'Login Required',
  type: UnauthorizedResponse,
})
@Controller('cars')
export class CarsController {
  constructor(
    private carsService: CarsService,
    private documentService: DocumentService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Car Created',
    type: CreatedBaseResponse,
  })
  @ApiBody({ type: CreatCardto })
  async creatCar(@Body() creatcardto: CreatCardto, @GetUser() userId: string) {
    await this.carsService.creatCar(creatcardto, userId);
    return {
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  @ApiOkResponse({
    description: 'Cars Found',
    type: GetCarResponse,
  })
  async findCars(@GetUser() userId: string) {
    return {
      statusCode: HttpStatus.OK,
      cars: await this.carsService.findCars(userId),
    };
  }

  @Patch('/:id')
  @ApiCreatedResponse({
    description: 'Car Created',
    type: CreatedBaseResponse,
  })
  @ApiBody({ type: UpdateCarDto })
  async updateCar(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @GetUser() userId: string,
  ) {
    await this.carsService.updateCar(id, updateCarDto, userId);
    return {
      statusCode: HttpStatus.CREATED,
    };
  }
  @ApiBody({ type: CarImgdto })
  @ApiNotFoundResponse({ description: 'Id NotFound', type: NotFoundResponse })
  @ApiCreatedResponse({
    description: 'upload file url',
    type: UploadImageResponse,
  })
  @Post('/images')
  async createPutPreSignedUrlByImageKey(
    @Body() carImg: CarImage,
    @GetUser() userId: string,
  ) {
    const imageKey = this.documentService.createCarDocObjectKey(carImg, userId);
    await this.carsService.updateCarImageKey(carImg.carId, userId, imageKey);
    return {
      statusCode: HttpStatus.CREATED,
      url: await this.documentService.createPutPreSignedUrlByImageKey(imageKey),
    };
  }
}
