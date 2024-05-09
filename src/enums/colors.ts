import { registerEnumType } from '@nestjs/graphql';

export enum AllowedColor {
  WHITE = 'WHITE',
  GREEN = 'GREEN',
  BLACK = 'BLACK',
  RED = 'RED',
}

registerEnumType(AllowedColor, {
  name: `AllowedColor`,
  description: `Allowed colors`,
});
