import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { WalletsService } from "../wallets.service";
import { Wallet } from "../../models/wallet.entity";

describe('Wallet service', () => {
    let service: WalletsService;
    let repository: Repository<Wallet>;
    const REPOSITORY_TOKEN = getRepositoryToken(Wallet);

    beforeAll(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WalletsService, {
                    provide: REPOSITORY_TOKEN,
                    useValue: {
                        save: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn()
                    }
                }
            ]
        }).compile();

        service = module.get<WalletsService>(WalletsService);
        repository = module.get<Repository<Wallet>>(REPOSITORY_TOKEN);
    });

    it('Campos definidos', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe("Criação de carteiras", () => {
        // Cria os mocks para as funções de repositório utilizadas
        beforeAll(() => {
            jest.spyOn(repository, "save").mockImplementation((wallet: Wallet) => {
                const create = new Wallet();
                create.name = wallet.name;
                create.description = wallet.description;
                create.createAt = new Date(Date.now());
                return Promise.resolve(create);
            });

            jest.spyOn(repository, "findOne").mockImplementation((findOptions: any) => {
                let result: Wallet = null;
                if(findOptions.where.name == "Existente") {
                    result = new Wallet();
                }
                return Promise.resolve(result);
            })
        });

        it("Cria uma nova carteira com sucesso", async() => {
            const result = await service.create("Teste", "Carteira de teste");
            expect(result.name).toBe("Teste");
            expect(result.description).toBe("Carteira de teste");
            expect(result.createAt.getTime()).toBeLessThanOrEqual(Date.now());
        });

        it("Falha em criar uma carteira com um nome já em uso", () => {
            expect(service.create("Existente", "Carteira de teste")).rejects.toThrowError("Carteira existente");
        });
    });

    describe("Atualização de carteiras", () => {
        // Cria os mocks para as funções de repositório utilizadas
        beforeAll(() => {
            jest.spyOn(repository, "findOne").mockImplementation((findOptions: any) => {
                let result: Wallet = null;
                if(findOptions.where.id == "123456") {
                    result = new Wallet();
                    result.id = "123456";
                }
                if(findOptions.where.name == "Existente") {
                    result = new Wallet();
                }
                return Promise.resolve(result);
            })

            jest.spyOn(repository, "save").mockImplementation((wallet: Wallet) => {
                return Promise.resolve(wallet);
            });
        });

        it("Atualiza com sucesso os dados da carteira", async() => {
            const result = await service.update("123456", "Novo nome", "Nova descrição");
            expect(result.id).toBe("123456");
            expect(result.name).toBe("Novo nome");
            expect(result.description).toBe("Nova descrição");
            expect(result.modifyAt.getTime()).toBeLessThanOrEqual(Date.now());
        });

        it("Falha na atualização por não encontrar a carteira pelo id", async() => {
            expect(service.update("123", "Novo nome", "Nova descrição"))
                .rejects.toThrowError(new Error("Carteira não encontrada"));
        });

        it("Falha na atualização por tentar utilizar um nome de carteira já cadastrada", async() => {
            expect(service.update("123456", "Existente", "Nova descrição"))
                .rejects.toThrowError(new Error("Nome já utilizado em outra carteira"));
        });
    });

    describe("Recupera carteiras existentes", () => {
        // Cria os mocks para as funções de repositório utilizadas
        beforeAll(() => {
            jest.spyOn(repository, "findOne").mockImplementation((findOptions: any) => {
                let result: Wallet = null;
                if(findOptions.where.id == "123456") {
                    result = new Wallet();
                    result.id = "123456";
                }
                return Promise.resolve(result);
            });

            jest.spyOn(repository, "find").mockResolvedValue([new Wallet(), new Wallet()]);
        });

        it("Falha em acessar dados de uma carteira inexistente", async() => {
            expect(service.findOne("123"))
                .rejects.toThrowError(new Error("Carteira não encontrada"));
        });

        it("Acessa com sucesso dados de uma carteira a partir de um id", async() => {
            const result = await service.findOne("123456");
            expect(result.id).toBe("123456");
        });

        it("Lista todas as carteiras existentes", async() => {
            const result = await service.findAll();
            expect(result.length).toBe(2);
        });
    });

});