import { getRepositoryToken } from "@nestjs/typeorm";
import { Tag } from "../../models/tag.entity";
import { TagsService } from "../tags.service";
import { Repository } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";

describe("Tags Service", () => {
    const REPOSITORY_TOKEN = getRepositoryToken(Tag);
    let repository: Repository<Tag>;
    let service: TagsService;

    beforeAll(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TagsService, {
                    provide: REPOSITORY_TOKEN,
                    useValue: {
                        save: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get<TagsService>(TagsService);
        repository = module.get<Repository<Tag>>(REPOSITORY_TOKEN);

        jest.spyOn(repository, "save").mockImplementation((tag: Tag) => {
            return Promise.resolve(tag);
        });
        
        jest.spyOn(repository, "findOne").mockImplementation((options: any) => {
            let result: Tag = null;
            if(options.where.name == "EXISTENTE") {
                result = new Tag();
                result.name = "EXISTENTE";
            }
            return Promise.resolve(result);
        });

        jest.spyOn(repository, "find").mockResolvedValue([
            new Tag(), new Tag(), new Tag()
        ]);
    });

    it("Campos definidos", () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe("Adição de nova tag", () => {
        it("Erro ao enviar um nome já existente", async() => {
            expect(service.create("existente"))
                .rejects.toThrowError(new Error("Nome já utilizado"));
        });

        it("Sucesso em cadastrar nova tag", async() => {
            const result = await service.create("nova");
            expect(result.name).toBe("NOVA");
        });
    });

    describe("Listagem de tags", () => {
        it("Recupera todas as tags cadastradas", async() => {
            const result = await service.getAll();
            expect(result.length).toBe(3);
        });
    });
});