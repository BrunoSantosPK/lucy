import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "../models/tag.entity";
import { Repository } from "typeorm";

@Injectable()
export class SeedService {
    constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

    async create() {
        const base = [
            {name: "SUPERMERCADO"}, {name: "LAZER"}, {name: "SAÚDE"}
        ];
        for(let i = 0; i < base.length; i++) {
            let element = await this.tagRepository.findOne({where: {name: base[i].name}})
            if(element) {
                continue;
            }

            let tag = new Tag();
            tag.name = base[i].name;
            await this.tagRepository.save(tag);
        }

        /*base.forEach(obj => {
            this.tagRepository.findOne({where: {name: obj.name}})
                .then(async element => {
                    if(!element) {
                        let tag = new Tag();
                        tag.name = obj.name;
                        await this.tagRepository.save(tag);
                    }
                })
                .catch(error => console.log(error));
        });*/
    }
}