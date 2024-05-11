import { ClientEntity } from "../../../enterprise/client.entity";

export class ClientsPresenter {
  static toHTTP(client: ClientEntity) {
    return {
      id: client.id.toValue(),
      name: client.name,
      cpf: client.cpf,
      email: client.email,
      phone: client.phone,
      status: client.status,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      deletedAt: client.deletedAt,
    };
  }
}
