import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Headers,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Account, Data } from './interfaces/interface';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getHello(@Param('id') id: string, @Query('status') status: string): string {
    const data: Data = { name: 'Geo', age: +id };
    const Params = {
      status: status,
    };
    console.log(Params);
    return this.appService.getHello(id, data);
  }

  @Post()
  async createData(
    @Body() payload: Account,
    @Headers('trackingid') headers: any,
  ): Promise<Account> {
    const { trackingid } = headers;
    console.log(payload, trackingid);
    const result = await this.appService.createAccount(payload);
    console.log(result, trackingid);
    return result;
  }

  @Get()
  async getAll(): Promise<Account[]> {
    return this.appService.getAccounts();
  }
}
