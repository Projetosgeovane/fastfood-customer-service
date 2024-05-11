import { BadRequestException, Body, ConflictException, Controller, Post } from "@nestjs/common";
import { CreateClientUseCase } from "src/modules/client/domain/application/use-cases/client/create-client.use-case";
import { CreateClientDTO } from "../../dtos/create-client.dto";

@Controller("client")
export class CreateClientController {
  constructor(private readonly createClientUseCase: CreateClientUseCase) { }

  @Post()
  async handle(@Body() body: CreateClientDTO) {
    const { name, cpf, email, password, phone, status } = body;

    const result = await this.createClientUseCase.execute({
      cpf,
      email,
      name,
      password,
      phone,
      status,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case Error: {
          throw new ConflictException(error.message);
        }
        default: {
          throw new BadRequestException();
        }
      }
    }
  }
}
