import { Controller, Get, Post, Body, Param, Res, Put } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Response } from 'express';
import { Wallet } from '../models/wallet.entity';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  async create(@Body() body: CreateWalletDto, @Res() res: Response) {
    let status = 200;
    try {
      const wallet: Wallet = await this.walletsService.create(body.name, body.description);
      res.status(status).json({data: wallet});
    } catch(error) {
      status = 500;
      res.status(status).json({statusCode: status, message: error.message});
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    let status = 200;
    try {
      const wallet = await this.walletsService.findOne(id);
      res.status(status).json({data: wallet});
    } catch(error) {
      status = 500;
      res.status(status).json({statusCode: status, message: error.message});
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    let status = 200;
    try {
      const wallets = await this.walletsService.findAll();
      res.status(status).json({data: wallets});
    } catch(error) {
      status = 500;
      res.status(status).json({statusCode: status, message: error.message});
    }
  }

  @Put()
  async update(@Body() body: UpdateWalletDto, @Res() res: Response) {
    let status = 200;
    try {
      const wallet = this.walletsService.update(body.id, body.name, body.description);
      res.status(status).send({data: wallet})
    } catch(error) {
      status = 500;
      res.status(status).json({statusCode: status, message: error.message});
    }
  }

  /*@Get()
  findAll() {
    return this.walletsService.findAll();
  }

  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(id);
  }*/
}
