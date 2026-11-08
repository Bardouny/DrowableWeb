import type { User } from "./User";

export class Authontication {
  authonticationId!: string;
  email!: string;
  phone!: string;
  user?: User | null;

  constructor(init?: Partial<Authontication>) {
    Object.assign(this, init);
  }
}
