import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateClientDeleteDataUseCase } from 'src/modules/client/domain/application/use-cases/deleteRequest/create-client-delete-data.use-case';

@Controller('client-delete-data')
export class CreateClientDeleteDataController {
  constructor(
    private readonly createClientDeleteDataUseCase: CreateClientDeleteDataUseCase,
  ) { }

  @Post()
  async handle(@Body() body: any) {
    const { clientId, reason } = body;

    const result = await this.createClientDeleteDataUseCase.execute({
      clientId,
      reason,
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
