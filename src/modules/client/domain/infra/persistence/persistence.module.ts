import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/common/database/database.module";
import { PrismaClientRepositoryImpl } from "./prisma/repositories/prisma-client.repository.impl";
import { ClientRepository } from "../../application/repositories/client.repository";

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      useClass: PrismaClientRepositoryImpl,
      provide: ClientRepository,
    }
  ],

  exports: [ClientRepository],
})

export class PersistenceModule { }
