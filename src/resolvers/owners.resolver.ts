/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { ComplexityEstimatorArgs } from 'graphql-query-complexity';
import { NewOwnerInput } from '../dto/new-owner.args';
import { AuthGuard } from '../guards/auth.guard';
import { loggerMiddleware } from '../middlewares/logger.middleware';
import { Car } from '../models/car.model';
import { Owner } from '../models/owner.model';
import { CarsService } from '../services/cars.service';
import { OwnersService } from '../services/owners.service';

@Resolver((of) => Owner)
export class OwnersResolver {
  constructor(
    private readonly _ownersService: OwnersService,
    private readonly _carsService: CarsService, // @Inject(`PubSub`) private readonly _pubSub: PubSub,
  ) {}

  @UseGuards(AuthGuard)
  @Query((returns) => Owner, {
    name: `owner`,
    complexity: (options: ComplexityEstimatorArgs) => {
      // we can override the default scoring(ComplexityPlugin)
      return Object.keys(options.args).length * options.childComplexity;
    },
  })
  async owner(@Args(`id`, { type: () => Int }) id: number) {
    return this._ownersService.findOneOwnerById(id);
  }

  @Mutation((returns) => Owner)
  async newOwner(
    @Args(`newOwnerInput`, {
      transform(value, metadata) {
        value.firstName = value.firstName.toUpperCase();
        return value;
      },
    })
    newOwnerDto: NewOwnerInput,
  ): Promise<Owner> {
    // dto.createdAt here has aldy parsed by DateScalar.parseValue middleware
    // console.log(`received`, newOwnerDto.createdAt); // string -> Date

    const owner = await this._ownersService.create(newOwnerDto);

    // console.log(`saved`, owner);
    // this._pubSub.publish(`newOwnerAboard`, { newOwnerAboard: owner });

    // note: owner.createdAt here will be intercepted by DateScalar.serialize to parse from timestamp to Date object
    return owner;
  }

  // Apollo Federation does not support pub/sub
  //   @Subscription((returns) => Owner, {
  //     name: `newOwnerAboard`,
  //   })
  //   newOwnerAboard() {
  //     console.log(`OwnersResolver: hey, newOwnerAboard!`);
  //     return this._pubSub.asyncIterator(`newOwnerAboard`);
  //   }

  @ResolveField(`cars`, (returns) => [Car], { middleware: [loggerMiddleware] })
  async getCars(@Parent() owner: Owner) {
    if (owner.cars?.length > 0) {
      const carPlates = owner.cars.map((x) => x.plateNo);
      return this._carsService.findAllByCarPlates(carPlates);
    }

    return [];
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Owner> {
    return await this._ownersService.findOneOwnerById(reference.id);
  }
}
