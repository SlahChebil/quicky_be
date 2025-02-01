import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument } from './shared/config/swagger/swagger';

async function bootstrap() {
  console.log(process.env.PORT)
  console.log(process.env.USER_PASSWORD)
  const app = await NestFactory.create(AppModule , {bodyParser: true});
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
    allowedHeaders: 'Content-Type, Accept',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  SwaggerModule.setup('api',app,createDocument(app))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
