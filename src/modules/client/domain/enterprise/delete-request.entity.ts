import { Optional } from '@enablers/core/types';
import { Entity, UniqueEntityID } from '../../../../../libs/core/src/entities';

interface DeleteRequestEntityProps {
  clientId: string;
  reason: string;

  createdAt: Date;
}

export class DeleteRequestEntity extends Entity<DeleteRequestEntityProps> {
  static instance(
    props: Optional<DeleteRequestEntityProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const client = new DeleteRequestEntity(
      {
        clientId: props.clientId ?? null,
        reason: props.reason ?? null,

        createdAt: new Date(),
        ...props,
      },
      id,
    );

    return client;
  }

  get clientId() {
    return this.props.clientId;
  }

  get reason() {
    return this.props.reason;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set clientId(value: string) {
    this.props.clientId = value;
  }

  set reason(value: string) {
    this.props.reason = value;
  }
}
