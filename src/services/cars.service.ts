import { Injectable } from '@nestjs/common';
import { AllowedColor } from '../enums/colors';
import { Car } from '../models/car.model';

@Injectable()
export class CarsService {
  async findOneByPlateNo(plateNo: string): Promise<Car> {
    // this can be something like get data from db
    return {
      plateNo,
      brand: `Toyota`,
      model: `CHR`,
      color: AllowedColor.WHITE,
      owner: {
        id: 1,
        firstName: `James`,
        lastName: `Doe`,
        createdAt: new Date(),
      },
    };
  }

  async findAllByOwner(ownerId: number): Promise<Car[]> {
    // this can be something like get data from db
    return [
      {
        plateNo: `PPP1234`,
        brand: `Toyota`,
        model: `CHR`,
        color: AllowedColor.WHITE,
        owner: {
          id: ownerId,
          firstName: `James`,
          lastName: `Doe`,
          createdAt: new Date(),
        },
      },
    ];
  }

  async findAllByCarPlates(plates: string[]): Promise<Car[]> {
    // this can be something like get data from db
    return plates.map((plateNo) => ({
      plateNo,
      brand: `Toyota`,
      model: `CHR`,
      color: AllowedColor.WHITE,
      owner: {
        id: 1,
        firstName: `James`,
        lastName: `Doe`,
        createdAt: new Date(),
      },
    }));
  }
}
