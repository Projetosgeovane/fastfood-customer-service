import { Either, failure, success } from "libs/core/src/types";
import { ClientEntity } from "../../../enterprise/client.entity";
import { ResourceExistsError } from "libs/core/src/errors";
import { ClientRepository } from "../../repositories/client.repository";
import { UniqueEntityID } from "libs/core/src/entities";

interface ClientRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  status: boolean;
}

type ClientResponse = Either<ResourceExistsError, object>;

export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute({
    cpf,
    email,
    name,
    password,
  }: ClientRequest): Promise<ClientResponse> {

    const clientAlreadyExists = await this.clientRepository.findByName(name);

    if (clientAlreadyExists) {
      return failure(new ResourceExistsError('Name already exists'));
    }

    const client = ClientEntity.instance({
      cpf,
      email,
      name,
      password,
      status: true,
    });

    await this.clientRepository.create(client);

    return success({});
  }
}
