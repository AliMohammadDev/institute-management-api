import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.setGlobalPrefix(process.env.BASE_URL as string);
  app.enableCors({ origin: '*' });

  if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
