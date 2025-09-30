import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

>>>>>>> e606b595f1cb1ffa22a536d6c9c6d03ab35b9f91
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../.env'),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.SYNC === 'true',
      logging: process.env.LOGGING === 'true',
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: process.env.NODE_ENV !== 'production',
      // playground: process.env.NODE_ENV !== "production",
      playground: false,
      path: process.env.BASE_URL,
      cache: 'bounded',
      formatError: (error: GraphQLError) => {
        if (process.env.NODE_ENV === 'production') return { message: error.message };
        // return error;
        return {
          message: error.message,
          originalError:
            // @ts-ignore
            error.extensions?.originalError || error.message,
        };
      },
      plugins: process.env.NODE_ENV !== 'production' ? [ApolloServerPluginLandingPageLocalDefault()] : [],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
