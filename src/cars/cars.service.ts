import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { identity } from 'rxjs';
import { CarInterface } from './cars.model';
import { CreatCardto, UpdateCarDto } from './Dto/creat-car-dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel('Car') private readonly CarModel: Model<CarInterface>,
  ) {}

  async creatCar(creatcardto: CreatCardto, userId: string) {
    const {
      color,
      numberPlate,
      engineNumber,
      bodyNumber,
      brand,
      model,
      Km,
      insuranceStart,
      insuranceFinish,
      insuranceNumber,
    } = creatcardto;
    const car = new this.CarModel({
      color,
      numberPlate,
      engineNumber,
      bodyNumber,
      brand,
      model,
      Km,
      insurance: {
        start: insuranceStart,
        finish: insuranceFinish,
        number: insuranceNumber,
      },
      userId,
    });
    const result = await car.save();
    return result;
  }

  async findCars(userId: string) {
    const found = await this.CarModel
      .find({ userId })
      .populate('driverId')
    if (!found) 
      throw new NotFoundException(`Not found any Cars`);
    
    return found;
  }

  async updateCar(id: string, updateCarDto: UpdateCarDto, userId: string) {
    const {
      color,
      numberPlate,
      engineNumber,
      bodyNumber,
      brand,
      model,
      Km,
      insuranceStart,
      insuranceFinish,
      insuranceNumber,
    } = updateCarDto;

    const carUpdate = {
      color,
      numberPlate,
      engineNumber,
      bodyNumber,
      brand,
      model,
      Km,
      insurance: {
        start: insuranceStart,
        finish: insuranceFinish,
        number: insuranceNumber,
      },
    };

    let update;
    try {
      update = await this.CarModel.findOneAndUpdate(
        { _id: id, userId },
        carUpdate,
        {
          new: true,
        },
      );
    } catch (error) {
      throw new NotFoundException(`Car with ID "${id}" not found`);
    }
    return update;
  }
  async assignCarToDriver(driverId: string, carId: string, userId: string) {
    let updateCar;
    updateCar = await this.CarModel.findOneAndUpdate(
      { _id: carId, userId },
      { driverId },
      {
        new: true,
      },
    );
    if (!updateCar) {
      throw new NotFoundException(`Car with ID "${carId}" not found`);
    }
  }

  async updateCarImageKey(carId: string, userId: string, keyImCar: string) {
    let updateDrive = await this.CarModel.findOneAndUpdate(
      { _id: carId, userId },
      { keyImCar },
      {
        new: true,
      },
    );
    if (!updateDrive) {
      throw new NotFoundException(`Driver with ID "${carId}" not found`);
    }
  }
}
