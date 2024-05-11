import { BadRequestException, Controller, Get, NotFoundException, Param, ParseIntPipe, Query } from "@nestjs/common";
import { FetchClientUseCase } from "src/modules/client/domain/application/use-cases/client/fetch-client.use-case";
import { ClientsPresenter } from "../../presenters/clients.presenter";

@Controller()
export class FetchClientController {
  constructor(private readonly fetchClientUseCase: FetchClientUseCase) { }
  @Get('client/:clientId')

  async handle(@Param('clientId') id: string) {
    const result = await this.fetchClientUseCase.execute({ id });

    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const clients = ClientsPresenter.toHTTP(result.value.client);

    return { clients };
  }
}
