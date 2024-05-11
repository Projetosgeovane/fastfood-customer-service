import { Prisma, Client as PrismaClient } from "@prisma/client";
import { ClientEntity } from "../../../enterprise/client.entity";
import { UniqueEntityID } from "@enablers/core/entities";

export class PrismaClientMapper {
  static toDomain(raw: PrismaClient): ClientEntity {
    const client = ClientEntity.instance(
      {
        name: raw.name,
        cpf: raw.cpf,
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
        status: raw.status,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return client;
  }

  static toPrisma(
    client: ClientEntity,
  ): Prisma.ClientUncheckedCreateInput {
    return {
      id: client.id.toValue(),
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      password: client.password,
      phone: client.phone,
      status: client.status,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      deletedAt: client.deletedAt,
    };
  }
}
