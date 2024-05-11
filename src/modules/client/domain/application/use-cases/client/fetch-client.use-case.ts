import { Injectable } from "@nestjs/common";
import { ClientRepository } from "../../repositories/client.repository";
import { Either, failure, success } from "libs/core/src/types";
import { ClientEntity } from "../../../enterprise/client.entity";

interface FetchClientByIdUseCaseRequest {
  id: string;
}

type FetchClientByIdUseCaseResponse = Either<
  null,
  {
    client: ClientEntity;
  }
>;
@Injectable()
export class FetchClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) { }

  async execute({id}: FetchClientByIdUseCaseRequest): Promise<FetchClientByIdUseCaseResponse> {
    const client = await this.clientRepository.findById(id);

    if(!client) {
      return failure(null);
    }

    return success({ client });
  }
}
