import { afterEach, describe, expect, it, vi } from "vitest";

import { Authontication } from "./Authontication";
import { Country } from "./Country";
import { PersonalInfo } from "./PersonalInfo";
import { MAX_VERIFICATION_CODE_RESENDS, User } from "./User";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("User.createAccount", () => {
  it("stores the user ID returned by the server", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ userId: "server-user-id" }), { status: 200 }),
    );
    const user = newUser();

    await user.createAccount("password");

    expect(user.userId).toBe("server-user-id");
  });

  it("rejects a successful response without a user ID", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));
    const user = newUser();

    await expect(user.createAccount("password")).rejects.toThrow(
      "Account creation response did not include a valid user ID.",
    );
  });
});

describe("User.resendVerificationCode", () => {
  it("resends the code using the account email and allows only three attempts", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));
    const user = newUser();

    for (let attempt = 0; attempt < MAX_VERIFICATION_CODE_RESENDS; attempt += 1) {
      await user.resendVerificationCode("password");
    }

    await expect(user.resendVerificationCode("password")).rejects.toThrow(
      "Activation code can only be resent 3 times.",
    );
    expect(fetchMock).toHaveBeenCalledTimes(MAX_VERIFICATION_CODE_RESENDS);
    expect(JSON.parse(String(fetchMock.mock.calls[0]?.[1]?.body))).toEqual({
      email: "test@example.com",
      password: "password",
    });
  });

  it("counts failed resend requests toward the three-attempt limit", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 500 }));
    const user = newUser();

    await expect(user.resendVerificationCode("password")).rejects.toThrow(
      "Activation code resend failed with status 500.",
    );
    expect(user.verificationCodeResendCount).toBe(1);
  });
});

function newUser(): User {
  return new User({
    userName: "test-user",
    enablesNotification: false,
    personalInfo: new PersonalInfo({
      firstName: "Test",
      lastName: "User",
      countryId: 1,
      country: new Country({ countryId: 1 }),
    }),
    authontication: new Authontication({
      email: "test@example.com",
      phone: "123456789",
    }),
  });
}
