import { Entity, UniqueEntityID } from "libs/core/src/entities";
import { Optional } from "libs/core/src/types";

interface ClientEntityProps {
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string;
  status: boolean;

  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;

}

export class ClientEntity extends Entity<ClientEntityProps> {
  static instance(
    props: Optional<ClientEntityProps, | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const client = new ClientEntity(
      {
        name: props.name ?? null,
        cpf: props.cpf ?? null,
        email: props.email ?? null,
        password: props.password ?? null,
        phone: props.phone ?? null,
        status: props.status ?? null,
        createdAt: new Date(),
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

  get phone() {
    return this.props.phone;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set email(value: string) {
    this.props.email = value;
  }

  set password(value: string) {
    this.props.password = value;
  }

  set phone(value: string) {
    this.props.phone = value;
  }
}
