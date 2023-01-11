import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "../models/tag.entity";
import { Repository } from "typeorm";

@Injectable()
export class SeedService {
    constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

    async create() {
        const base = [
            {name: "SUPERMERCADO", systemTag: false},
            {name: "LAZER", systemTag: false},
            {name: "SAÚDE", systemTag: false},
            {name: "TECNOLOGIA", systemTag: false},
            {name: "EMERGÊNCIA", systemTag: false},
            {name: "RECORRÊNCIA", systemTag: false},
            {name: "RESERVA", systemTag: false},
            {name: "MORADIA", systemTag: false},
            {name: "TRANSFERÊNCIA", systemTag: true}
        ];
        for(let i = 0; i < base.length; i++) {
            let element = await this.tagRepository.findOne({where: {name: base[i].name}})
            if(element) {
                continue;
            }

            let tag = new Tag();
            tag.name = base[i].name;
            tag.systemTag = base[i].systemTag;
            await this.tagRepository.save(tag);
        }
    }
}