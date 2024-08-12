import { Prisma, DeletionRequest as PrismaDeleteRequest } from '@prisma/client';
import { UniqueEntityID } from '@enablers/core/entities';
import { DeleteRequestEntity } from '../../../enterprise/delete-request.entity';

export class PrismaDeleteRequestMapper {
  static toDomain(raw: PrismaDeleteRequest): DeleteRequestEntity {
    const client = DeleteRequestEntity.instance(
      {
        clientId: raw.clientId,
        reason: raw.reason,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );

    return client;
  }

  static toPrisma(
    client: DeleteRequestEntity,
  ): Prisma.DeletionRequestUncheckedCreateInput {
    return {
      id: client.id.toValue(),
      clientId: client.clientId,
      reason: client.reason,
      createdAt: client.createdAt,
    };
  }
}
