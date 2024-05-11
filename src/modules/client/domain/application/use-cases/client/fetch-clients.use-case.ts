import { Either, success } from "libs/core/src/types";
import { ClientEntity } from "../../../enterprise/client.entity";
import { ClientRepository } from "../../repositories/client.repository";
import { Injectable } from "@nestjs/common";

interface FetchClientsUseCaseRequest {
  page: number;
}

type FetchClientsUseCaseResponse = Either<null, { clients: ClientEntity[] }>;
@Injectable()
export class FetchClientsUseCase {
  constructor(private clientRepository: ClientRepository) { }

  async execute({ page }: FetchClientsUseCaseRequest): Promise<FetchClientsUseCaseResponse> {
    const clients = await this.clientRepository.findManyRecent({ page });

    return success({ clients });
  }
}
