import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ClassLevelModule } from './class-level/class-level.module';
import { StudyMaterialModule } from './study-material/study-material.module';
import { GroupModule } from './group/group.module';
import { StudentModule } from './student/student.module';
import { AppointmentModule } from './appointment/appointment.module';
import { TeacherSharedModule } from './teacher-shared/teacher-shared.module';
import { TeacherModule } from './teacher/teacher.module';

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

    ClassLevelModule,
    StudyMaterialModule,
    GroupModule,
    StudentModule,
    ClassLevelModule,
    AppointmentModule,
    TeacherSharedModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
