import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../../../common/database/prisma/prisma.service';
import { DeleteRequestRepository } from 'src/modules/client/domain/application/repositories/deletion-request.repository';
import { PaginationParams } from '@enablers/core/repositories';
import { DeleteRequestEntity } from 'src/modules/client/domain/enterprise/delete-request.entity';
import { PrismaDeleteRequestMapper } from '../../mappers/prisma-delete-request.mapper';

@Injectable()
export class PrismaDeleteRequestRepositoryImpl
  implements DeleteRequestRepository {
  private readonly PERPAGE = 20;
  constructor(private readonly prisma: PrismaService) { }
  async create(data: DeleteRequestEntity): Promise<void> {
    const client = PrismaDeleteRequestMapper.toPrisma(data);

    await this.prisma.deletionRequest.create({
      data: {
        ...client,
      },
    });
  }

  save(data: DeleteRequestEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findManyRecent(page: PaginationParams): Promise<DeleteRequestEntity[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<DeleteRequestEntity> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  softDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
