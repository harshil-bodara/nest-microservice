import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroserviceClientModule } from './client.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

const NODE_ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        path.resolve(process.cwd(), 'env/.env'),
        path.resolve(
          process.cwd(),
          'env',
          !NODE_ENV ? '.env.dev' : `.${NODE_ENV}.env`,
        ),
      ],
      isGlobal: true,
    }),
    MicroserviceClientModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
