import * as request from 'supertest';
import { WalletsController } from "../wallets.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { WalletsService } from "../wallets.service";
import { Wallet } from "../../models/wallet.entity";
import { INestApplication, ValidationPipe } from "@nestjs/common";

describe("Sistema de teste de controllers para carteiras", () => {
    let app: INestApplication;
    let service: WalletsService;

    beforeAll(async() => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WalletsController],
            providers: [{
                provide: WalletsService,
                useValue: {
                    create: jest.fn(),
                    update: jest.fn(),
                    findOne: jest.fn(),
                    findAll: jest.fn()
                }
            }]
        }).compile();

        service = module.get<WalletsService>(WalletsService);
        app = module.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();

        //controller = module.get<WalletsController>(WalletsController);
        //service = module.get<WalletsService>(WalletsService);
    });

    afterAll(async() => {
        await app.close();
    });

    it("Aplicação definida", () => {
        expect(app).toBeDefined();
    });

    describe("Criando carteira", () => {
        // Cria o comportamento do serviço neste teste
        beforeAll(() => {
            const wallet = new Wallet();
            wallet.id = "9a132650-531c-42bc-b158-1d0e60b5f785";
            jest.spyOn(service, "create").mockResolvedValue(wallet);
        });

        it("Envia requisição sem corpo", async() => {
            const res = await request(app.getHttpServer()).post("/wallets").send({});
            expect(res.statusCode).toBe(400)
            expect(res.body).toHaveProperty("statusCode", 400);
        });

        it("Envia nome curto demais", async() => {
            let body = {name: "Curt", description: "Esta é uma descrição válida"};
            let res = await request(app.getHttpServer()).post("/wallets").send(body);
            expect(res.statusCode).toBe(400);
            expect(res.body.message.length).toBe(1);

            body.name = "Longo longo longo longo longo longo longo longo lon";
            res = await request(app.getHttpServer()).post("/wallets").send(body);
            expect(res.statusCode).toBe(400);
            expect(res.body.message.length).toBe(1);
        });

        it("Envia descrição curta demais", async() => {
            const body = {name: "Carteira", description: "Curta cur"};
            const res = await request(app.getHttpServer()).post("/wallets").send(body);
            expect(res.statusCode).toBe(400);
            expect(res.body.message.length).toBe(1);
        });

        it("Realiza o cadastro com sucesso", async() => {
            const body = {name: "Carteira", description: "Esta é uma carteira de teste"};
            const res = await request(app.getHttpServer()).post("/wallets").send(body);

            expect(res.statusCode).toBe(200);
            expect(res.body.data.id).toBe("9a132650-531c-42bc-b158-1d0e60b5f785");
        })
    });

    describe("Atualizando dados de carteira", () => {});

    describe("Recuperando carteiras", () => {});

});