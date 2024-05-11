import { ResourceNotFoundError } from "libs/core/src/errors";
import { ClientRepository } from "../../repositories/client.repository";
import { Injectable } from "@nestjs/common";
import { Either, failure, success } from "libs/core/src/types";

interface EditClientUseCaseRequest {
  id: string;
  name: string;
  phone: string;
  password: string;
}

type EditClientUseCaseResponse = Either<ResourceNotFoundError, object>;
@Injectable()
export class EditClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute({
    id,
    name,
    password,
  }: EditClientUseCaseRequest): Promise<EditClientUseCaseResponse> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      return failure(new ResourceNotFoundError('Client not found'));
    }

    client.name = name;
    client.password = password;

    await this.clientRepository.save(client);

    return success({});
  }
}
