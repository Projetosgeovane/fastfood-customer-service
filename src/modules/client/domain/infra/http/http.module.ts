import { Module } from '@nestjs/common';
import { CreateClientController } from './controllers/client/create-client.controller.';
import { PersistenceModule } from '../persistence/persistence.module';
import { CreateClientUseCase } from '../../application/use-cases/client/create-client.use-case';
import { FetchClientsController } from './controllers/client/fetch-clients.controller';
import { FetchClientsUseCase } from '../../application/use-cases/client/fetch-clients.use-case';
import { EditClientController } from './controllers/client/edit-client.controler';
import { EditClientUseCase } from '../../application/use-cases/client/edit-client.use-case';
import { FetchClientController } from './controllers/client/fetch-client.controller';
import { FetchClientUseCase } from '../../application/use-cases/client/fetch-client.use-case';
import { CreateClientDeleteDataController } from './controllers/deleteRequest/create-client.delete-data.controller';
import { CreateClientDeleteDataUseCase } from '../../application/use-cases/deleteRequest/create-client-delete-data.use-case';

@Module({
  imports: [PersistenceModule],
  controllers: [
    CreateClientController,
    CreateClientDeleteDataController,
    FetchClientsController,
    FetchClientController,
    EditClientController,
  ],
  providers: [
    CreateClientUseCase,
    CreateClientDeleteDataUseCase,
    FetchClientsUseCase,
    FetchClientUseCase,
    EditClientUseCase,
  ],
})
export class HttpModule { }
