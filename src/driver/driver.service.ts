import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarsService } from '../cars/cars.service';
import { CarInterface } from '../cars/cars.model';
import { Driver } from './driver.model';
import { CreatDriverdto } from './Dto/creat-driver-dto';
import { DocumentService } from '../document/document.service';

@Injectable()
export class DriverService {
  private drivers: Driver[] = [];
  constructor(
    @InjectModel('Driver') private readonly DriverModel: Model<Driver>,
    private carsService: CarsService,
    private documentService: DocumentService,
  ) {}

  async creatDriver(creatdriverdto: CreatDriverdto, userId: string) {
    const { phoneNumber, name, lisenseNumber, imageName } = creatdriverdto;

    const driver = new this.DriverModel({
      phoneNumber,
      name,
      lisenseNumber,
      userId,
    });
    const result = await driver.save();
    if (imageName) {
      const driverImg = { imageName, driverId: result.id };

      const imageKey = this.documentService.createDriverDocObjectKey(
        driverImg,
        userId,
      );

      await this.updateImageKey(driverImg.driverId, userId, imageKey);

      return await this.documentService.createPutPreSignedUrlByImageKey(
        imageKey,
      );
    } else return 'Not available url';
  }

  async findDriver(userId: string) {
    const found = await this.DriverModel
    .find({ userId })
    .populate('carId');
    if (!found) 
      throw new NotFoundException(`Not found any Driver`);
    
    return found;
  }
  async findNameDriver(userId: string) {
    const find = await this.DriverModel.aggregate([
      {
        $match: { userId: userId },
      },
      // {
      //   $group: {
      //     _id: null,
      //     drivers: { $push: '$name' },
      //   },
      // },
      {
        $project: { _id: 1, name: 1 },
      },
    ]);
    if (!find || find.length === 0) {
      throw new NotFoundException(`Not found any Driver`);
    }
    return find;
  }

  async updateDriver(
    id: string,
    creatdriverdto: CreatDriverdto,
    userId: string,
  ) {
    const { phoneNumber, name, lisenseNumber } = creatdriverdto;
    const driverUpdate = {
      phoneNumber,
      name,
      lisenseNumber,
    };
    let update;
    update = await this.DriverModel.findOneAndUpdate(
      { _id: id, userId },
      driverUpdate,
      {
        new: true,
      },
    );
    if (!update) {
      throw new NotFoundException(`Driver with ID "${id}" not found`);
    }

    return update;
  }
  async assignCarToDriver(driverId: string, carId: string, userId: string) {
    let updateDrive;
    updateDrive = await this.DriverModel.findOneAndUpdate(
      { _id: driverId, userId },
      { carId },
      {
        new: true,
      },
    );
    if (!updateDrive) {
      throw new NotFoundException(`Driver with ID "${driverId}" not found`);
    }
    await this.carsService.assignCarToDriver(driverId, carId, userId);
  }
  async updateImageKey(driverId: string, userId: string, keyImDrive: string) {
    let updateDrive = await this.DriverModel.findOneAndUpdate(
      { _id: driverId, userId },
      { keyImDrive },
      {
        new: true,
      },
    );
    if (!updateDrive) {
      throw new NotFoundException(`Driver with ID "${driverId}" not found`);
    }
  }
}
