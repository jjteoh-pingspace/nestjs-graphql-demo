import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { upperDirectiveTransformer } from './directives/upper-case.directive';
import { ComplexityPlugin } from './plugins/complexity.plugin';
import { CarsResolver } from './resolvers/cars.resolver';
import { OwnersResolver } from './resolvers/owners.resolver';
import { DateScalar } from './scalars/date.scalar';
import { CarsService } from './services/cars.service';
import { OwnersService } from './services/owners.service';

const services = [AppService, CarsService, OwnersService];
const resolvers = [CarsResolver, OwnersResolver];
// Apollo federation does not support pub/sub
// const pubSub = {
//   provide: `PubSub`,
//   useValue: new PubSub(),
// };
const scalars = [DateScalar];
const plugins = [ComplexityPlugin];

// a fake auth function
// const mockAuthFunc = async (token) => {
//   if (!token) return false;

//   // in actual world,
//   // this can be your token validation logic
//   return true;
// };

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`./.env`],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      //<ApolloDriverConfig>({
      driver: ApolloFederationDriver, //ApolloDriver,
      autoSchemaFile: {
        path: join(process.cwd(), `src/schema.gql`),
        federation: 2,
      }, // set to true if you want the schema to generate on-the-fly in memory
      sortSchema: true, // sort generated schema lexicographically
      transformSchema: (schema) => upperDirectiveTransformer(schema, `upper`), // register our custom directive i.e. @upper()
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: `upper`,
            description: `convert string to uppercase`,
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()], // use external plugin for playground

      // include: [CatsModule] // explicit declare which module contains resolvers
      // installSubscriptionHandlers: true,
      // Apollo federation does not support pub/sub
      // subscriptions: {
      //   // 'graphql-ws': true, // use graphql-ws library to support pub/sub feature
      //   // there is also other subscription driver, e.g. subscriptions-transport-ws
      //   'graphql-ws': {
      //     path: `graphql`,
      //     onConnect: (context: Context<any>) => {
      //       const { connectionParams, extra } = context;

      //       console.log(`connectionParams`, connectionParams);
      //       console.log(`extra`, extra);

      //       const authToken = connectionParams.authToken;

      //       if (!mockAuthFunc(authToken)) {
      //         throw new Error(`Unauthorized!`);
      //       }

      //       // fake a user, in actual app, you may retrieve from db
      //       const user = {
      //         id: 1,
      //         name: `James`,
      //       };
      //       // set user into the extra(connection context),
      //       // so that you can access the user info from anywhere within the subscription
      //       extra[`user`] = { user };
      //     },
      //   },
      // },
      // context: (ctx) => {
      //   // const extra = connectionParams.extra;
      //   // console.log(ctx);
      //   // connection.extra will be equal to what was returned by the "onConnect" callback
      //   // depends on your driver, the property maybe different
      //   // console.log(`context.extra`, extra);
      // },
    }),
  ],
  controllers: [AppController],
  providers: [
    ...services,
    ...resolvers,
    //pubSub,
    ...scalars,
    ...plugins,
  ],
})
export class AppModule {}
