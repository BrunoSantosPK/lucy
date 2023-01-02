import { NestFactory } from "@nestjs/core";
import { SeedModule } from "./seed/seed.module";
import { Seeder } from "./seed/seeder";

async function bootstrap() {
    NestFactory.createApplicationContext(SeedModule)
        .then(async appContext => {
            const seed = appContext.get(Seeder);
            await seed.seed();
        })
        .catch(error => {
            console.log(error);
        });
}

bootstrap();