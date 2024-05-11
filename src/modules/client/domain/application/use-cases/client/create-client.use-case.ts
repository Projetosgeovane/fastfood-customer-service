import { Either, failure, success } from "libs/core/src/types";
import { ClientEntity } from "../../../enterprise/client.entity";
import { ResourceExistsError } from "libs/core/src/errors";
import { ClientRepository } from "../../repositories/client.repository";
import { Injectable } from "@nestjs/common";
interface ClientRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string;
  status: boolean;
}

type ClientResponse = Either<ResourceExistsError, object>;
@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute({
    cpf,
    email,
    name,
    phone,
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
      phone,
      status: true,
    });

    await this.clientRepository.create(client);

    return success({});
  }
}
