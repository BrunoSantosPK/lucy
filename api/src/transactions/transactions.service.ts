import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "../models/transaction.entity";
import { Repository } from "typeorm";
import { Wallet } from "../models/wallet.entity";
import { NewTransactionDto } from "./dto/new-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { Tag } from "../models/tag.entity";
import { Transfer } from "../models/transaction-transfer.entity";
import { TransactionTag } from "../models/transaction-tag.entity";

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
        @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
        @InjectRepository(Tag) private tagRepository: Repository<Tag>,
        @InjectRepository(Transfer) private transferRepository: Repository<Transfer>,
        @InjectRepository(TransactionTag) private transactionTagRepository: Repository<TransactionTag>
    ) {}

    async new(newTransactionDto: NewTransactionDto) {
        // Busca registro da carteira
        let walletOrigin: Wallet = await this.walletRepository.findOne({where: {id: newTransactionDto.idWalletOrigin}});
        if(walletOrigin === null) {
            throw new Error("Carteira de origem não encontrada.");
        }

        // Caso seja uma transação e a carteira de destino seja informada, busca a carteira
        let walletDestiny: Wallet = null;
        const tags: Tag[] = [];
        if(newTransactionDto.idWalletDestiny) {
            walletDestiny = await this.walletRepository.findOne({where: {id: newTransactionDto.idWalletDestiny}});
            if(walletDestiny === null) {
                throw new Error("Carteira de destino não encontrada.");
            }
            const transferTag = await this.tagRepository.findOne({where: {name: "TRANSFERÊNCIA"}});
            tags.push(transferTag);
        }

        // Valida as tags passadas como argumento e salva a instância de cada uma
        for(let i = 0; i < newTransactionDto.tags.length; i++) {
            let tag = await this.tagRepository.findOne({where: {id: newTransactionDto.tags[i]}});
            if(tag === null) {
                throw new Error("Tag não encontrada.");
            }
            tags.push(tag);
        }

        // Define a transação principal
        const origin = new Transaction();
        origin.walletId = walletOrigin.id;
        origin.value = newTransactionDto.value;
        origin.date = newTransactionDto.date;
        if(newTransactionDto.comment) { origin.comment = newTransactionDto.comment; }
        await this.transactionRepository.save(origin);

        // Caso fornecida, cria a transação oposta no destino
        const destiny = new Transaction();
        if(newTransactionDto.idWalletDestiny) {
            destiny.walletId = walletDestiny.id;
            destiny.value = -1 * newTransactionDto.value;
            destiny.date = newTransactionDto.date;
            if(newTransactionDto.comment) { destiny.comment = newTransactionDto.comment; }
            await this.transactionRepository.save(destiny);

            const transfer = new Transfer();
            transfer.originId = origin.id;
            transfer.destinyId = destiny.id;
            await this.transferRepository.save(transfer);
        }

        // Registra as tags encontradas na tabela própria
        tags.forEach(async(tag) => {
            let transactionTag = new TransactionTag();
            transactionTag.tagId = tag.id;
            transactionTag.transactionId = origin.id;
            await this.transactionTagRepository.save(transactionTag);
        });

        // Caso seja uma transferência, registra na tabela de transferência
        if(newTransactionDto.idWalletDestiny) {
            tags.forEach(async(tag) => {
                let transactionTag = new TransactionTag();
                transactionTag.tagId = tag.id;
                transactionTag.transactionId = destiny.id;
                await this.transactionTagRepository.save(transactionTag);
            });
        }
    }

    async update(updateTransactionDto: UpdateTransactionDto) {
        // Busca registro da transação
        const transaction = await this.transactionRepository.findOne({where: {id: updateTransactionDto.idTransaction}});
        if(transaction === null) {
            throw new Error("Transação não encontrada.");
        }

        // Verifica se a transação é uma transferência
        const transfer = await this.transferRepository.findOne({
            where: [{originId: transaction.id}, {destinyId: transaction.id}]
        });
        if(transfer) {
            throw new Error("Esta transação não pode ser alterada por se tratar de uma transferência.");
        }

        // Valida as tags enviadas
        const tags: Tag[] = [];
        for(let i = 0; i < updateTransactionDto.tags.length; i++) {
            let tag = await this.tagRepository.findOne({where: {id: updateTransactionDto.tags[i]}});
            if(tag === null) {
                throw new Error("Tag não encontrada.");
            }
            tags.push(tag);
        }

        // Faz a alteração da transferência
        transaction.value = updateTransactionDto.value;
        transaction.date = updateTransactionDto.date;
        await this.transactionRepository.save(transaction);

        // Adiciona tags novas
        const transactionTags = await this.transactionTagRepository.find({where: {transactionId: transaction.id}});
        tags.forEach(async(tag) => {
            let insert = true;
            transactionTags.forEach(tt => {
                if(tt.tagId == tag.id) {
                    insert = false;
                }
            });
            if(insert) {
                let tt = new TransactionTag();
                tt.tagId = tag.id;
                tt.transactionId = transaction.id;
                await this.transactionTagRepository.save(tt);
            }
        });

        // Remove tags antigas
        transactionTags.forEach(async(tt) => {
            let remove = true;
            tags.forEach(tag => {
                if(tag.id == tt.tagId) {
                    remove = false;
                }
            });
            if(remove) {
                await this.transactionTagRepository.remove(tt);
            }
        });
    }

    async delete(transactionId: string) {
        // Busca registro da transação
        const transaction = await this.transactionRepository.findOne({where: {id: transactionId}});
        if(transaction === null) {
            throw new Error("Transação não encontrada.");
        }

        // Verifica se a transação é uma transferência
        const transfer = await this.transferRepository.findOne({
            where: [{originId: transaction.id}, {destinyId: transaction.id}]
        });

        // Monta a lista de transações a serem removidas
        const remove: Transaction[] = [];
        if(transfer) {
            remove.push(await this.transactionRepository.findOne({where: {id: transfer.destinyId}}));
            remove.push(await this.transactionRepository.findOne({where: {id: transfer.originId}}));
        } else {
            remove.push(transaction);
        }

        // faz a remoção
        await this.transactionRepository.remove(remove);
    }
}