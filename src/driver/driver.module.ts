import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModule } from '../document/document.module';
import { CarSchema } from '../cars/cars.model';
import { CarsModule } from '../cars/cars.module';
import { DriverController } from './driver.controller';
import { DriverSchema } from './driver.model';
import { DriverService } from './driver.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Driver', schema: DriverSchema },
      { name: 'Car', schema: CarSchema },
    ]),
    CarsModule,
    DocumentModule,
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
