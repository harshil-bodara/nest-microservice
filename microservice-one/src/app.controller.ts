import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'register' })
  async createUserController(body: any) {
    try {
      return body;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
