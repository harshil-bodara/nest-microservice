import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({})
export class MicroserviceClientModule {
  static register(): DynamicModule {
    return {
      module: MicroserviceClientModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'MICROSERVICE_ONE',
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return ClientProxyFactory.create({
              transport: Transport.TCP,
              options: {
                host: configService.get<string>('MICROSERVICE_ONE_HOST'),
                port: configService.get<number>('MICROSERVICE_ONE_PORT'),
              },
            });
          },
        },
      ],
      exports: ['MICROSERVICE_ONE'],
    };
  }
}
