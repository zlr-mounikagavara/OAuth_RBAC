import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 
  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());


  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
