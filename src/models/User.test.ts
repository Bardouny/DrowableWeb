import { afterEach, describe, expect, it, vi } from "vitest";

import { Authontication } from "./Authontication";
import { Country } from "./Country";
import { PersonalInfo } from "./PersonalInfo";
import { User } from "./User";

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
