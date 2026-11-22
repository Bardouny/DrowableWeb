import {
  postApiAccounts,
  postApiAccountsActivate,
  type postApiAccountsActivateResponse,
  type postApiAccountsResponse,
} from "../api/generated/accounts/accounts";
import type { ActivateAccountCommand, CreateAccountCommand } from "../api/generated/models";
import { Authontication } from "./Authontication";
import type { Country } from "./Country";
import { PersonalInfo, type GenderType } from "./PersonalInfo";
import { Profile } from "./Profile";

export type NewUserInput = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: Country;
  dateOfBirth?: Date | null;
  gender?: GenderType | null;
  enablesNotification?: boolean;
};

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
  projectEnrollmentEnrolledUsers: import("./ProjectEnrollment").ProjectEnrollment[] = [];
  projectEnrollmentSenderUsers: import("./ProjectEnrollment").ProjectEnrollment[] = [];
  projects: import("./Project").Project[] = [];
  userVerificationCodes: import("./UserVerificationCode").UserVerificationCode[] = [];

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  static New(input: NewUserInput): User {
    const userId = crypto.randomUUID();
    const authonticationId = crypto.randomUUID();
    const personalInfoId = crypto.randomUUID();
    const profile = new Profile();

    const user = new User({
      userId,
      userName: input.userName.trim(),
      createdAt: new Date(),
      lastLoginAt: null,
      enablesNotification: input.enablesNotification ?? false,
      isActive: true,
      personalInfoId,
      profileId: profile.profileId,
      authonticationId,
      authontication: new Authontication({
        authonticationId,
        email: input.email.trim(),
        phone: input.phone.trim(),
      }),
      personalInfo: new PersonalInfo({
        personalInfoId,
        firstName: input.firstName.trim(),
        lastName: input.lastName.trim(),
        dateOfBirth: input.dateOfBirth ?? null,
        gender: input.gender ?? null,
        countryId: input.country.countryId,
        country: input.country,
      }),
      profile,
    });

    user.authontication.user = user;
    user.personalInfo.user = user;
    user.personalInfo.country.personalInfos.push(user.personalInfo);
    user.profile.user = user;

    return user;
  }

  async createAccount(password: string, options?: RequestInit): Promise<postApiAccountsResponse> {
    const command: CreateAccountCommand = {
      firstName: this.personalInfo.firstName,
      lastName: this.personalInfo.lastName,
      dateOfBirth: this.personalInfo.dateOfBirth?.toISOString().slice(0, 10) ?? null,
      gender: this.personalInfo.gender ?? null,
      countryId: this.personalInfo.countryId,
      email: this.authontication.email,
      phone: this.authontication.phone,
      userName: this.userName,
      password,
      enableNotifications: this.enablesNotification,
    };

    const response = await postApiAccounts(command, options);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Account creation failed with status ${response.status}.`);
    }

    return response;
  }

  async activateAccount(
    activationCode: string,
    options?: RequestInit,
  ): Promise<postApiAccountsActivateResponse> {
    const command: ActivateAccountCommand = {
      userId: this.userId,
      activationCode,
    };

    const response = await postApiAccountsActivate(command, options);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Account activation failed with status ${response.status}.`);
    }

    this.isActive = true;
    return response;
  }
}
