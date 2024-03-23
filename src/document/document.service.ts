import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CarImage } from './interface/upload-car-image';
import { DriverImage } from './interface/upload-driver-image';
import * as AWS from 'aws-sdk';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from '../driver/driver.model';
import { CarInterface } from '../cars/cars.model';
@Injectable()
export class DocumentService {
  private s3;
  private bucket;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      endpoint: this.configService.get('AWS_API_ENDPOINT'),
      signatureVersion: 'v4',
    });

    this.bucket = this.configService.get('AWS_BUCKET_NAME');
  }

  createPutPreSignedUrlByImageKey(imageKey) {
    var params = {
      Bucket: this.bucket,
      Key: imageKey,
      Expires: 600,
      ContentType: 'image/*',
    };
    var url = this.s3.getSignedUrl('putObject', params);
    return url;
  }
  //userId/carId/imgeName
  createCarDocObjectKey(iuserimage: CarImage, userId: string) {
    const keyImCar =
      userId +
      '/' +
      iuserimage.carId +
      '.' +
      iuserimage.imageName.split('.')[1];
    return keyImCar;
  }
  //userId/driverId.imgeName
  createDriverDocObjectKey(iuserimage: DriverImage, userId: string) {
    const keyImDrive =
      userId +
      '/' +
      iuserimage.driverId +
      '.' +
      iuserimage.imageName.split('.')[1];
    return keyImDrive;
  }

  createGetPreSignedUrl(imageKey) {
    var params = { Bucket: this.bucket, Key: imageKey, Expires: 20 };
    var url = this.s3.getSignedUrl('getObject', params);
    return url;
  }

  async enableCorsOnBucket() {
    // Create initial parameters JSON for putBucketCors
    var thisConfig = {
      AllowedHeaders: ['*'],
      AllowedMethods: ['PUT', 'GET', 'POST', 'OPTIONS', 'HEAD', 'DELETE'],
      AllowedOrigins: ['*'],
      ExposeHeaders: [],
      MaxAgeSeconds: 3000,
    };

    // Create array of configs then add the config object to it
    var corsRules = new Array(thisConfig);

    // Create CORS params
    var corsParams = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      CORSConfiguration: { CORSRules: corsRules },
    };
    // console.log(corsParams)

    this.s3.putBucketCors(corsParams, function (err, data) {
      if (err) {
        // display error message
        console.log('Error', err);
      } else {
        // update the displayed CORS config for the selected bucket
        console.log('Success', data);
      }
    });
  }
}
