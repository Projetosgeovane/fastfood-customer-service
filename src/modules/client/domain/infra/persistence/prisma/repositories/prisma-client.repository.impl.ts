import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/modules/client/domain/application/repositories/client.repository';
import { ClientEntity } from 'src/modules/client/domain/enterprise/client.entity';
import { PrismaClientMapper } from '../../mappers/prisma-client.mapper';
import { PrismaService } from '../../../../../../../common/database/prisma/prisma.service';
import { PaginationParams } from '@enablers/core/repositories';

@Injectable()
export class PrismaClientRepositoryImpl implements ClientRepository {
  private readonly PERPAGE = 20;
  constructor(private readonly prisma: PrismaService) { }

  async findByName(name: string): Promise<ClientEntity | null> {
    const client = await this.prisma.client.findFirst({
      where: {
        name,
      },
    });

    if (!client) {
      return null;
    }

    return PrismaClientMapper.toDomain(client);
  }

  async create(data: ClientEntity): Promise<void> {
    const client = PrismaClientMapper.toPrisma(data);

    await this.prisma.client.create({
      data: {
        ...client,
      },
    });
  }

  async deleteData(data: any): Promise<void> {
    await this.prisma.client.create({
      data: {
        ...data,
      },
    });
  }

  async save(body: ClientEntity): Promise<void> {
    const client = PrismaClientMapper.toPrisma(body);

    await this.prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        ...client,
      },
    });
  }

  async findManyRecent({ page }: PaginationParams): Promise<ClientEntity[]> {
    const client = await this.prisma.client.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: this.PERPAGE,
      skip: (page - 1) * this.PERPAGE,
    });

    return client.map(PrismaClientMapper.toDomain);
  }

  async findById(id: string): Promise<ClientEntity> {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
      },
    });

    if (!client) {
      return null;
    }

    return PrismaClientMapper.toDomain(client);
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  softDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
