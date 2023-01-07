import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "../models/transaction.entity";
import { Repository } from "typeorm";
import { Wallet } from "../models/wallet.entity";
import { NewTransactionDto } from "./dto/new-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { Tag } from "../models/tag.entity";

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
        @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
        @InjectRepository(Tag) private tagRepository: Repository<Tag>
    ) {}

    async new(newTransactionDto: NewTransactionDto) {
        let walletOrigin: Wallet = await this.walletRepository.findOne({where: {id: newTransactionDto.idWalletOrigin}});
        if(walletOrigin === null) {
            throw new Error("Carteira de origem não encontrada.");
        }

        let walletDestiny: Wallet = null;
        let transferTag: Tag = null;
        if(newTransactionDto.idWalletDestiny) {
            walletDestiny = await this.walletRepository.findOne({where: {id: newTransactionDto.idWalletDestiny}});
            if(walletDestiny === null) {
                throw new Error("Carteira de destino não encontrada.");
            }
            transferTag = await this.tagRepository.findOne({where: {name: "TRANSFERÊNCIA"}});
        }

        const tags: Tag[] = [];
        for(let i = 0; i < newTransactionDto.tags.length; i++) {
            let tag = await this.tagRepository.findOne({where: {id: newTransactionDto.tags[i]}});
            if(tag === null) {
                throw new Error("Tag não encontrada.");
            }
            tags.push(tag);
        }
    }

    async update(updateTransactionDto: UpdateTransactionDto) {}

    async delete(transactionId: string) {}
}