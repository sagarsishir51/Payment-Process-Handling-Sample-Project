import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {initializeTransactionalContext, StorageDriver,} from 'typeorm-transactional';
import {AppModule} from './app.module';
import {AllExceptionsFilter} from './frameworks/primary/filters/exception.filter';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Hexagonal-Architecture-Demo-Project')
    .setDescription('List of Apis')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  app.setGlobalPrefix('api/v1');

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.APP_PORT || 5000);
}

bootstrap();
