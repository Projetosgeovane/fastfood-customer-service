import { ResourceExistsError } from '@enablers/core/errors';
import { ClientRepository } from '../../repositories/client.repository';
import { Injectable } from '@nestjs/common';
import { Either, failure, success } from '@enablers/core/types';
import { DeleteRequestRepository } from '../../repositories/deletion-request.repository';
import { DeleteRequestEntity } from '../../../enterprise/delete-request.entity';

type ClientResponse = Either<ResourceExistsError, object>;
@Injectable()
export class CreateClientDeleteDataUseCase {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly deleteRequestRepository: DeleteRequestRepository,
  ) { }

  async execute({ clientId, reason }: any): Promise<ClientResponse> {
    const clientAlreadyExists = await this.clientRepository.findById(clientId);

    if (!clientAlreadyExists) {
      return failure(new ResourceExistsError('Name not exists'));
    }

    const deleteRequest = DeleteRequestEntity.instance({
      clientId,
      reason,
    });
    await this.deleteRequestRepository.create(deleteRequest);

    return success({});
  }
}
