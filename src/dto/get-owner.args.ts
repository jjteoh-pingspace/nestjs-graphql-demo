import { ArgsType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@ArgsType()
export class GetOwnerArgs {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @MinLength(3)
  lastName?: string;
}
