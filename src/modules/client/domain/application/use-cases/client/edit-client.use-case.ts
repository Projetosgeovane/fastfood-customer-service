import { Either, failure, success } from "libs/core/src/types";
import { ClientRepository } from "../../repositories/client.repository";
import { ResourceNotFoundError } from "libs/core/src/errors";

interface EditClientUseCaseRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

type EditClientUseCaseResponse = Either<ResourceNotFoundError, object>;

export class EditClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute({
    id,
    email,
    name,
    password,
  }: EditClientUseCaseRequest): Promise<EditClientUseCaseResponse> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      return failure(new ResourceNotFoundError('Client not found'));
    }

    client.name = name;
    client.email = email;
    client.password = password;

    await this.clientRepository.save(client);

    return success({});
  }
}
