import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: process.env.MICROSERVICE_ONE_HOST, port: parseInt(process.env.MICROSERVICE_ONE_PORT) },
    },
  );

  await app.listen();
}
bootstrap();
