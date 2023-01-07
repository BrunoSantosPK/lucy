import { getRepositoryToken } from "@nestjs/typeorm";
import { Transaction } from "../../models/transaction.entity";
import { Wallet } from "../../models/wallet.entity";
import { TransactionService } from "../transactions.service";
import { Repository } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { Tag } from "../../models/tag.entity";

describe("Transactions Service", () => {
    const REPOSITORY_TOKEN_TRANSACTION = getRepositoryToken(Transaction);
    const REPOSITORY_TOKEN_WALLET = getRepositoryToken(Wallet);
    const REPOSITORY_TOKEN_TAG = getRepositoryToken(Tag);

    let repositoryTransaction: Repository<Transaction>;
    let repositoryWallet: Repository<Wallet>;
    let repositoryTag: Repository<Tag>;
    let service: TransactionService;

    beforeAll(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TransactionService, {
                provide: REPOSITORY_TOKEN_TRANSACTION,
                useValue: {}
            }, {
                provide: REPOSITORY_TOKEN_WALLET,
                useValue: {}
            }, {
                provide: REPOSITORY_TOKEN_TAG,
                useValue: {}
            }]
        }).compile();

        service = module.get<TransactionService>(TransactionService);
        repositoryTag = module.get<Repository<Tag>>(REPOSITORY_TOKEN_TAG);
        repositoryWallet = module.get<Repository<Wallet>>(REPOSITORY_TOKEN_WALLET);
        repositoryTransaction = module.get<Repository<Transaction>>(REPOSITORY_TOKEN_TRANSACTION);
    });

    it("Campos definidos", () => {
        expect(service).toBeDefined();
        expect(repositoryTag).toBeDefined();
        expect(repositoryWallet).toBeDefined();
        expect(repositoryTransaction).toBeDefined();
    });
});