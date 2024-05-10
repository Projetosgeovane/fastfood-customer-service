import { BaseRepository } from "libs/core/src/repositories";
import { ClientEntity } from "../../enterprise/client.entity";

export abstract class ClientRepository extends BaseRepository<ClientEntity> {
  abstract findByName(name: string): Promise<Boolean>
}
