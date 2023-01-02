import { Injectable } from "@nestjs/common";
import { SeedService } from "./seed.service";

@Injectable()
export class Seeder {
    constructor(private readonly seedService: SeedService) {}

    async seed() {
        await this.seedService.create();
    }
}