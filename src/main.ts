import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const configService = app.get(ConfigService);

  const MODE = configService.get<number>('MODE');
  const PORT = configService.get<number>('PORT');
  const HOST = configService.get<number>('HOST');
  const PROTOCOL = configService.get<number>('PROTOCOL');
  const swaggerUrl = configService.get<string>('SWAGGER_URL');

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(`Banks API | mode: ${MODE}`)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerUrl, app, document);

  await app.listen(PORT, () => {
    console.log(`Server has been started on ${PROTOCOL}://${HOST}:${PORT}`);
    console.log(`Open swagger ${PROTOCOL}://${HOST}:${PORT}/${swaggerUrl}`);
  });
}

bootstrap();
