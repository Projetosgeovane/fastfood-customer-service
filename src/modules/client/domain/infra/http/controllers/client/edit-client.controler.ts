import { BadRequestException, Body, Controller, NotFoundException, Param, Put } from "@nestjs/common";
import { EditClientUseCase } from "src/modules/client/domain/application/use-cases/client/edit-client.use-case";
import { EditClientDTO } from "../../dtos/edit-client.dto";

@Controller()
export class EditClientController {
  constructor(private readonly editClientUseCase: EditClientUseCase) { }

  @Put('client/:clientId')
  async handle(@Param('clientId') id: string, @Body() body: EditClientDTO) {
    const { name, phone, password } = body;

    const result = await this.editClientUseCase.execute({
      id,
      name,
      phone,
      password,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case Error:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }
  }
}
