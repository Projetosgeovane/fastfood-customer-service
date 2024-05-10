import { Entity, UniqueEntityID } from "libs/core/src/entities";
import { Optional } from "libs/core/src/types";

interface ClientEntityProps {
  name: string;
  cpf: string;
  email: string;
  password: string;
  status: boolean;

  created_at: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;

}

export class ClientEntity extends Entity<ClientEntityProps> {
  static instance(
    props: Optional<ClientEntityProps, | 'created_at'>,
    id?: UniqueEntityID,
  ) {
    const client = new ClientEntity(
      {
        name: props.name ?? null,
        cpf: props.cpf ?? null,
        email: props.email ?? null,
        password: props.password ?? null,
        status: props.status ?? null,
        created_at: new Date(),
        updatedAt: props.updatedAt ?? null,
        deletedAt: props.deletedAt ?? null,
        ...props,
      },
      id,
    );

    return client;
  }

  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.created_at;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }
}
