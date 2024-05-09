/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { Car } from '../models/car.model';
import { NewCarInput } from './new-car.args';

@InputType()
export class NewOwnerInput {
  @Field()
  @MaxLength(30)
  //  @Directive(`@upper`) // this will not work, for input type, use transform pipe instead
  //  @Field({ middleware: [upperCaseMiddleware] }) // this will not work, middleware only work for object type, use transform pipe instead
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  createdAt?: Date;

  @Field((type) => [NewCarInput], { nullable: true })
  @IsOptional()
  cars?: Car[];
}
