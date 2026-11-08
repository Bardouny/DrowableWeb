import type { User } from "./User";

export class Connection {
  connectionId!: string;
  status!: string;
  createdAt!: Date;
  senderUserId!: string;
  recieverUserId!: string;
  recieverUser!: User;
  senderUser!: User;

  constructor(init?: Partial<Connection>) {
    Object.assign(this, init);
  }
}
