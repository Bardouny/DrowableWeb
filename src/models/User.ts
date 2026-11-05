export class User {
  userId!: string;
  userName!: string;
  passwordHash!: string;
  createdAt!: Date;
  lastLoginAt?: Date | null;
  enablesNotification!: boolean;
  isActive!: boolean;
  personalInfoId!: string;
  profileId!: string;
  authonticationId!: string;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}