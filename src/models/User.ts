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
  authontication!: import("./Authontication").Authontication;
  chatMessages: import("./ChatMessage").ChatMessage[] = [];
  connectionRecieverUsers: import("./Connection").Connection[] = [];
  connectionSenderUsers: import("./Connection").Connection[] = [];
  personalInfo!: import("./PersonalInfo").PersonalInfo;
  profile!: import("./Profile").Profile;
  projectEnrollmentEnrolledUsers: import("./ProjectEnrollment").ProjectEnrollment[] =
    [];
  projectEnrollmentSenderUsers: import("./ProjectEnrollment").ProjectEnrollment[] =
    [];
  projects: import("./Project").Project[] = [];
  userVerificationCodes: import("./UserVerificationCode").UserVerificationCode[] =
    [];

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  lockUsingVerificationCode(
    verificationCode: import("./UserVerificationCode").UserVerificationCode,
  ): void {
    this.isActive = false;

    if (verificationCode.isUsed) {
      throw new Error("Cannot provide an already-used verification code.");
    }

    verificationCode.user = this;
    verificationCode.userId = this.userId;
    this.userVerificationCodes.push(verificationCode);
  }

  unlockUsingVerificationCode(
    verificationCode: import("./UserVerificationCode").UserVerificationCode,
  ): void {
    if (verificationCode.isUsed) {
      throw new Error("Cannot provide an already-used verification code.");
    }

    this.isActive = true;
    verificationCode.isUsed = true;
  }
}
