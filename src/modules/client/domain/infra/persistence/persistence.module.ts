import { Module } from "@nestjs/common";
import { PrismaClientRepositoryImpl } from "./prisma/repositories/prisma-client.repository.impl";
import { ClientRepository } from "../../application/repositories/client.repository";
import { DatabaseModule } from "../../../../../common/database/database.module";

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
