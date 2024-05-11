import { BadRequestException, Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import { FetchClientsUseCase } from "src/modules/client/domain/application/use-cases/client/fetch-clients.use-case";
import { ClientsPresenter } from "../../presenters/clients.presenter";

@Controller("client")
export class FetchClientsController {
  constructor(private readonly fetchClientsUseCase: FetchClientsUseCase) { }

  @Get()
  async handle(@Query('page', ParseIntPipe) page: number) {
    const result = await this.fetchClientsUseCase.execute({ page });

    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const clients = result.value.clients.map(ClientsPresenter.toHTTP);

    return { clients };
  }
}
