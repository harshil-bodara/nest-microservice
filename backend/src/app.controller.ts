import { BadRequestException, Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MICROSERVICE_ONE') private oneService: ClientProxy,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  createUser(@Body() body: any) {
    try {
      console.log("eddddddddddddddddd")
      return this.oneService.send({ cmd: 'register' }, body);
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}