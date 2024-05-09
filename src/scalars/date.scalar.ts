/* eslint-disable @typescript-eslint/no-unused-vars */
import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ValueNode } from 'graphql';

@Scalar(`Date`, (type) => Date)
export class DateScalar implements CustomScalar<Date, number> {
  description = `Date custom scalar type`;

  // value(string) receive from client
  // parse to timestamp
  parseValue(value: string): number {
    // console.log(`in serialize`, value);
    return new Date(value).getTime();
  }

  // parse timestamp to date object and return to client
  serialize(timeStamp: number): Date {
    // console.log(`in parse value`, timeStamp);
    return new Date(timeStamp);
  }

  parseLiteral(vn: ValueNode): number {
    // console.log(`in parse literal`);

    return null;
  }
}
