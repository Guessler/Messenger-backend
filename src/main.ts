import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.quard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

  app.enableCors({
    origin: 'http://localhost:3000',
    method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('Messenger')
    .setDescription('fast messenger for daily using')
    .setVersion('1.0.0')
    .addTag('TL')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  // app.useGlobalGuards(JwtAuthGuard)

  await app.listen(PORT, () => console.log(`service started on port ${PORT}`));
}
bootstrap();
