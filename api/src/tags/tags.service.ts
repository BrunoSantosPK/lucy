import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "../models/tag.entity";
import { Repository } from "typeorm";

@Injectable()
export class TagsService {
    constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

    async create(name: string) {
        name = name.toUpperCase();
        const search: Tag = await this.tagRepository.findOne({where: {name}});
        if(search) {
            throw new Error("Nome já utilizado");
        }

        const tag = new Tag();
        tag.name = name;
        return await this.tagRepository.save(tag);
    }

    async getAll() {
        return await this.tagRepository.find();
    }
}