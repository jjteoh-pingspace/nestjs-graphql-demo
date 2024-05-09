import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { CarsResolver } from '../resolvers/cars.resolver';
import { OwnersResolver } from '../resolvers/owners.resolver';

// this is the script to generate sdl manually without starting the app
// NOTE: this script only print schema to console, you still
// need to copy and paste to schema.gpl
// further improvement can be done
async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([OwnersResolver, CarsResolver]);
  console.log(printSchema(schema));
}

generateSchema();
