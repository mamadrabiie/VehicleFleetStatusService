import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsModule } from './cars/cars.module';
import { UserModule } from './user/user.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage`],
    }),
    CarsModule,
    DriverModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get(
          'MONGODB_USERNAME',
        )}:${configService.get('MONGODB_PASSWORD')}@${configService.get(
          'MONGODB_HOSTNAME',
        )}?${configService.get('MONGODB_OPTIONS')}`,
      }),
    }),
    UserModule,
  ],
})
export class AppModule {}
