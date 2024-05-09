import { Injectable } from '@nestjs/common';
import { NewOwnerInput } from '../dto/new-owner.args';
import { AllowedColor } from '../enums/colors';
import { Owner } from '../models/owner.model';

@Injectable()
export class OwnersService {
  async findOneOwnerById(id: number): Promise<Owner> {
    // this can be something like get data from db, from another REST api
    return {
      id,
      firstName: `James`,
      lastName: `Doe`,
      createdAt: new Date(),
      cars: [
        {
          plateNo: `PPP1234`,
          brand: `Toyota`,
          model: `CHR`,
          color: AllowedColor.WHITE,
          owner: null,
        },
      ],
    };
  }

  async create(dto: NewOwnerInput): Promise<Owner> {
    return {
      id: 1,
      firstName: dto.firstName,
      lastName: dto.lastName,
      createdAt: dto.createdAt ?? new Date(),
      cars: dto.cars ?? [],
    };
  }
}
