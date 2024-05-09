/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Car } from '../models/car.model';
import { Owner } from '../models/owner.model';
import { CarsService } from '../services/cars.service';
import { OwnersService } from '../services/owners.service';

@Resolver((of) => Car)
export class CarsResolver {
  constructor(
    private readonly _carsService: CarsService,
    private readonly _ownersService: OwnersService, // @Inject(`PubSub`) private readonly _pubSub: PubSub,
  ) {}

  @Query((returns) => Car, { name: `car` })
  async car(@Args(`plateNo`) plateNo: string) {
    return this._carsService.findOneByPlateNo(plateNo);
  }

  // Apollo federation does not support pub/sub
  //   @Subscription((returns) => Owner, {
  //     name: `newOwnerAboard`,
  //   })
  //   newOwnerAboard() {
  //     console.log(`carsResolver: hey, newOwnerAboard!`);
  //     return this._pubSub.asyncIterator(`newOwnerAboard`);
  //   }

  @ResolveField(`owner`, (returns) => Owner)
  async getCars(@Parent() car: Car) {
    const { owner } = car;
    return this._ownersService.findOneOwnerById(owner.id);
  }
}
