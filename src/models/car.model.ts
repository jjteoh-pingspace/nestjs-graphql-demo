/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { AllowedColor } from '../enums/colors';
import { Owner } from './owner.model';

@ObjectType()
export class Car {
  @Field()
  plateNo: string;

  @Field({ description: `car brand` })
  brand: string;

  @Field()
  model: string;

  @Field((type) => AllowedColor)
  color: AllowedColor;

  @Field((type) => Owner)
  owner: Owner;
}
