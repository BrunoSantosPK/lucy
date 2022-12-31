import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../models/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletsService {
  constructor(@InjectRepository(Wallet) private walletRepository: Repository<Wallet>) {}

  async create(name: string, description: string) {
    // Verifica se o nome já está em uso
    const search: Wallet = await this.walletRepository.findOne({ where: { name } });
    if(search !== null) {
      throw new Error("Carteira existente");
    }

    const wallet = new Wallet();
    wallet.name = name;
    wallet.description = description;
    const result: Wallet = await this.walletRepository.save(wallet);
    return result;
  }

  async update(id: string, name: string, description: string) {
    // Verifica se o nome informado não está sendo utilizado
    let search: Wallet = await this.walletRepository.findOne({where: {name}});
    if(search !== null) {
      throw new Error("Nome já utilizado em outra carteira");
    }

    // Recupera objeto a ser modificado
    search = await this.walletRepository.findOne({where: {id}});
    if(search === null) {
      throw new Error("Carteira não encontrada");
    }

    // Faz a atualização do registro
    search.name = name;
    search.description = description;
    search.modifyAt = new Date(Date.now());
    this.walletRepository.save(search);
    return search;
  }

  async findOne(id: string) {
    const search: Wallet = await this.walletRepository.findOne({where: {id}});
    if(search === null) {
      throw new Error("Carteira não encontrada");
    }

    return search;
  }

  async findAll() {
    return await this.walletRepository.find();
  }

}
