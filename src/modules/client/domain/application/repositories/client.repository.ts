import { BaseRepository } from '@enablers/core/repositories';
import { ClientEntity } from '../../enterprise/client.entity';

export abstract class ClientRepository extends BaseRepository<ClientEntity> {
  abstract findByName(name: string): Promise<ClientEntity | null>;
  abstract deleteData(data: any): Promise<void>;
}
