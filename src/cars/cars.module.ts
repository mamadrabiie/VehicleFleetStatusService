import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentModule } from '../document/document.module';
import { UserSchema } from '../user/user.model';
import { UserModule } from '../user/user.module';
import { CarsController } from './cars.controller';
import { CarSchema } from './cars.model';
import { CarsService } from './cars.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Car', schema: CarSchema },
      { name: 'User', schema: UserSchema },
    ]),
    UserModule,
    DocumentModule,
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
