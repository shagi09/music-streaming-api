import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Spotify-like Music API')
    .setDescription('API documentation for the Spotify-like music service')
    .setVersion('1.0')
    .addBearerAuth() // enable JWT token support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Swagger UI at /api-docs

    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000`);
  console.log(`📘 Swagger docs available at http://localhost:3000/api-docs`);
}
bootstrap();
