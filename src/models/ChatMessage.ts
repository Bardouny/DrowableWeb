import type { User } from "./User";

export class ChatMessage {
  chatMessageId!: string;
  content!: string;
  sentAt!: Date;
  userId!: string;
  user!: User;

  constructor(init?: Partial<ChatMessage>) {
    Object.assign(this, init);
  }
}
