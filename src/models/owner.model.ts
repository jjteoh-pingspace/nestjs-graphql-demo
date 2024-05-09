/* eslint-disable @typescript-eslint/no-unused-vars */
import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Admin } from '../decorators/admin.decorator';
import { checkRoleMiddleware } from '../middlewares/role-check.middleware';
import { Car } from './car.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class Owner {
  @Field((type) => ID)
  id: number;

  @Directive(`@upper`) // optionally, convert this to custom decorator "@UpperCase" to avoid human typo
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((type) => Int, {
    nullable: true,
    deprecationReason: `no longer relatable`, // this is equivalent to @deprecated(reason: "no longer relatable") in gpl schema
  })
  age?: number;

  @Field({ middleware: [checkRoleMiddleware] })
  @Admin()
  createdAt: Date;

  @Field((type) => [Car], { nullable: 'items', complexity: 3 }) //if array set to null on null, set `itemsAndList`
  cars?: Car[];
}
