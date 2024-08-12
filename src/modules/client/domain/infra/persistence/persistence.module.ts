import { Module } from '@nestjs/common';
import { PrismaClientRepositoryImpl } from './prisma/repositories/prisma-client.repository.impl';
import { ClientRepository } from '../../application/repositories/client.repository';
import { DatabaseModule } from '../../../../../common/database/database.module';
import { DeleteRequestRepository } from '../../application/repositories/deletion-request.repository';
import { PrismaDeleteRequestRepositoryImpl } from './prisma/repositories/prisma-delete-request.impl';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      useClass: PrismaClientRepositoryImpl,
      provide: ClientRepository,
    },
    {
      useClass: PrismaDeleteRequestRepositoryImpl,
      provide: DeleteRequestRepository,
    },
  ],

  exports: [ClientRepository, DeleteRequestRepository],
})
export class PersistenceModule { }
