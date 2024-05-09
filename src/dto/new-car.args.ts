/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { AllowedColor } from '../enums/colors';

@InputType()
export class NewCarInput {
  @Field()
  plateNo: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field((type) => AllowedColor)
  color: AllowedColor;
}
