import type { User } from "./User";

export class UserVerificationCode {
  userVerificationCodeId!: string;
  verificationCode!: string;
  createdAt!: Date;
  expirationDate!: Date;
  isUsed!: boolean;
  userId!: string;
  user?: User | null;

  constructor(init?: Partial<UserVerificationCode>) {
    Object.assign(this, init);
  }
}
