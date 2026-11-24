import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Github,
  LockKeyhole,
  Mail,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { alertService } from "@/services/alert";
import { Country } from "@/models/Country";
import { User } from "@/models/User";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Drowable Sync" },
      {
        name: "description",
        content: "Create a Drowable Sync account and start creating together.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userToActivate, setUserToActivate] = useState<User | null>(null);
  const [activationCode, setActivationCode] = useState("");
  const [isActivating, setIsActivating] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const countries = Country.All();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    if (password !== String(formData.get("confirmPassword") ?? "")) {
      setNotice("Passwords do not match.");
      alertService.error("Passwords do not match.");
      return;
    }

    const countryId = Number(formData.get("countryId"));
    const country = Number.isSafeInteger(countryId) ? Country.Find(countryId) : undefined;
    if (!country) {
      setNotice("Select a valid country.");
      alertService.error("Select a valid country.");
      return;
    }

    const user = User.New({
      userName: String(formData.get("userName") ?? "").trim(),
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      country,
      dateOfBirth: formData.get("dateOfBirth")
        ? new Date(`${String(formData.get("dateOfBirth"))}T00:00:00.000Z`)
        : null,
      gender: (String(formData.get("gender") ?? "") as "Male" | "Female" | "Other" | "") || null,
      enablesNotification: formData.has("enableNotifications"),
    });

    setIsSubmitting(true);
    try {
      await user.createAccount(password);
      setUserToActivate(user);
      setNotice("");
      setActivationCode("");
      setIsActivated(false);
      alertService.success("Account created. Enter your activation code to continue.");
    } catch (error) {
      const description =
        error instanceof Error ? error.message : "Please check your connection and try again.";
      setNotice(`Unable to create your account. ${description}`);
      alertService.error("Unable to create your account.", { description });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleActivationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");

    if (!userToActivate || !/^\d{6}$/.test(activationCode)) {
      setNotice("Enter the six-digit activation code.");
      return;
    }

    setIsActivating(true);
    try {
      await userToActivate.activateAccount(activationCode);
      setIsActivated(true);
      alertService.success("Your account has been activated.");
    } catch (error) {
      const description =
        error instanceof Error ? error.message : "Please check your connection and try again.";
      setNotice(`Unable to activate your account. ${description}`);
      alertService.error("Unable to activate your account.", { description });
    } finally {
      setIsActivating(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-drowable-surface-container-lowest text-drowable-on-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 -top-40 size-[28rem] rounded-full bg-drowable-secondary-container/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-36 top-1/4 size-[26rem] rounded-full bg-drowable-tertiary-container/15 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-1/4 size-[30rem] rounded-full bg-drowable-primary-container/15 blur-[110px]"
      />

      <div className="relative mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.82fr)]">
        <section className="hidden flex-col justify-between px-10 py-9 lg:flex xl:px-16 xl:py-12">
          <Link to="/" className="inline-flex w-fit items-center gap-3 rounded-lg">
            <span className="flex size-10 items-center justify-center rounded-xl bg-drowable-indigo text-white shadow-[0_0_30px_rgba(99,102,241,0.4)]">
              <Workflow aria-hidden="true" size={22} />
            </span>
            <span className="text-lg font-semibold tracking-tight">Drowable Sync</span>
          </Link>

          <div className="relative z-10 mx-auto w-full max-w-2xl py-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-drowable-outline-variant/70 bg-drowable-surface-container/70 px-3 py-1.5 text-xs font-medium text-drowable-on-surface-variant">
              <Sparkles aria-hidden="true" className="size-3.5 text-drowable-tertiary" />
              Your next idea starts here
            </div>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] xl:text-5xl">
              Make room for{" "}
              <span className="bg-gradient-to-r from-drowable-primary via-drowable-tertiary to-drowable-secondary bg-clip-text text-transparent">
                good ideas.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-drowable-on-surface-variant">
              Bring your team, tools, and creative work into one shared studio. Start with a blank
              canvas and see where it takes you.
            </p>

            <div className="relative mt-11 overflow-hidden rounded-2xl border border-drowable-outline-variant/70 bg-drowable-surface-container-low/90 p-5 shadow-2xl shadow-black/30">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(var(--drowable-outline-variant)_1px,transparent_1px)] [background-size:20px_20px]"
              />
              <div className="relative flex items-center justify-between border-b border-drowable-outline-variant/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-drowable-primary-container/20 text-drowable-primary">
                    <Workflow aria-hidden="true" size={17} />
                  </span>
                  <div>
                    <p className="text-sm font-medium">Untitled workspace</p>
                    <p className="mt-0.5 text-xs text-drowable-on-surface-variant">
                      A little room to think
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-drowable-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-drowable-emerald-300">
                  <span className="size-1.5 rounded-full bg-drowable-emerald-400" />
                  All changes saved
                </span>
              </div>

              <div className="relative grid min-h-56 place-items-center py-8">
                <div
                  aria-hidden="true"
                  className="absolute size-44 rounded-full bg-gradient-to-br from-drowable-indigo/30 via-drowable-purple-500/20 to-drowable-cyan/20 blur-3xl"
                />
                <div className="relative flex size-36 rotate-[-8deg] items-center justify-center rounded-[2rem] border border-drowable-primary/40 bg-gradient-to-br from-drowable-surface-container-high to-drowable-surface-container-lowest shadow-[0_20px_70px_rgba(99,102,241,0.2)]">
                  <div className="absolute inset-3 rounded-[1.4rem] border border-dashed border-drowable-outline-variant/80" />
                  <Sparkles aria-hidden="true" className="size-12 text-drowable-primary" />
                  <span className="absolute -right-5 top-2 flex size-9 items-center justify-center rounded-xl border border-drowable-outline-variant bg-drowable-surface-container-high text-drowable-tertiary shadow-lg">
                    <Zap aria-hidden="true" className="size-4" />
                  </span>
                  <span className="absolute -bottom-3 -left-6 rounded-md border border-drowable-outline-variant bg-drowable-surface-container-high px-2 py-1 text-[10px] font-medium text-drowable-on-surface-variant shadow-lg">
                    Your next big thing
                  </span>
                </div>
              </div>

              <div className="relative flex items-center justify-between border-t border-drowable-outline-variant/60 pt-4">
                <div className="flex -space-x-2">
                  <span className="grid size-7 place-items-center rounded-full border-2 border-drowable-surface-container-low bg-drowable-indigo-500 text-[10px] font-semibold text-white">
                    M
                  </span>
                  <span className="grid size-7 place-items-center rounded-full border-2 border-drowable-surface-container-low bg-drowable-cyan-600 text-[10px] font-semibold text-white">
                    J
                  </span>
                  <span className="grid size-7 place-items-center rounded-full border-2 border-drowable-surface-container-low bg-drowable-purple-700 text-[10px] font-semibold text-white">
                    A
                  </span>
                </div>
                <p className="text-xs text-drowable-on-surface-variant">
                  Better ideas, made together.
                </p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {[
                { label: "One shared studio", icon: Workflow },
                { label: "Ideas in real time", icon: Zap },
                { label: "Made for teams", icon: Check },
              ].map(({ label, icon: Icon }) => (
                <div
                  className="flex items-center gap-2 text-xs text-drowable-on-surface-variant"
                  key={label}
                >
                  <Icon aria-hidden="true" className="size-3.5 shrink-0 text-drowable-tertiary" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-drowable-on-surface-variant">© 2025 Drowable Systems Inc.</p>
        </section>

        <section className="flex min-h-screen flex-col border-drowable-outline-variant/50 bg-drowable-surface/90 px-5 py-6 backdrop-blur-xl sm:px-10 lg:border-l lg:px-12 xl:px-16">
          <header className="flex items-center justify-between lg:justify-end">
            <Link to="/" className="inline-flex items-center gap-2.5 lg:hidden">
              <span className="flex size-9 items-center justify-center rounded-xl bg-drowable-indigo text-white">
                <Workflow aria-hidden="true" size={20} />
              </span>
              <span className="font-semibold tracking-tight">Drowable Sync</span>
            </Link>
            {userToActivate ? (
              isActivated ? (
                <Link
                  to="/login"
                  className="text-sm font-medium text-drowable-primary transition-colors hover:text-drowable-primary-fixed"
                >
                  Sign in
                </Link>
              ) : (
                <p className="text-sm text-drowable-on-surface-variant">Account verification</p>
              )
            ) : (
              <p className="text-sm text-drowable-on-surface-variant">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-drowable-primary transition-colors hover:text-drowable-primary-fixed"
                >
                  Sign in
                </Link>
              </p>
            )}
          </header>

          <div className="mx-auto my-auto w-full max-w-md py-10">
            {userToActivate ? (
              <div className="space-y-6">
                {isActivated ? (
                  <div className="space-y-3">
                    <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-drowable-outline-variant bg-drowable-surface-container-high text-drowable-primary shadow-lg shadow-drowable-indigo/10">
                      <Check aria-hidden="true" className="size-5" />
                    </div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-drowable-tertiary">
                      Verification complete
                    </p>
                    <h2 className="text-3xl font-semibold tracking-tight">Account activated</h2>
                    <p className="text-sm leading-6 text-drowable-on-surface-variant">
                      Your account is ready. Sign in to start creating.
                    </p>
                    <Link
                      to="/login"
                      className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-drowable-indigo px-4 text-sm font-semibold text-white shadow-lg shadow-drowable-indigo/20 transition hover:bg-drowable-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drowable-primary focus-visible:ring-offset-2 focus-visible:ring-offset-drowable-surface"
                    >
                      Sign in
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-drowable-outline-variant bg-drowable-surface-container-high text-drowable-primary shadow-lg shadow-drowable-indigo/10">
                        <Mail aria-hidden="true" className="size-5" />
                      </div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-drowable-tertiary">
                        One last step
                      </p>
                      <h2 className="text-3xl font-semibold tracking-tight">
                        Activate your account
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-drowable-on-surface-variant">
                        Enter the six-digit activation code sent to{" "}
                        <span className="font-medium text-drowable-on-surface">
                          {userToActivate.authontication.email}
                        </span>
                        .
                      </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleActivationSubmit}>
                      <div className="space-y-2">
                        <label className="text-sm font-medium" id="activation-code-label">
                          Six-digit code
                        </label>
                        <InputOTP
                          aria-label="Six-digit activation code"
                          autoComplete="one-time-code"
                          maxLength={6}
                          onChange={setActivationCode}
                          pattern={REGEXP_ONLY_DIGITS}
                          value={activationCode}
                        >
                          <InputOTPGroup className="w-full justify-between gap-2">
                            {Array.from({ length: 6 }, (_, index) => (
                              <InputOTPSlot
                                className="h-12 w-12 rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low text-base"
                                index={index}
                                key={index}
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>

                      {notice && (
                        <p
                          aria-live="polite"
                          className="rounded-lg border border-drowable-tertiary/30 bg-drowable-tertiary/10 px-3 py-2.5 text-sm text-drowable-on-surface"
                          role="status"
                        >
                          {notice}
                        </p>
                      )}

                      <button
                        className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-drowable-indigo px-4 text-sm font-semibold text-white shadow-lg shadow-drowable-indigo/20 transition hover:bg-drowable-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drowable-primary focus-visible:ring-offset-2 focus-visible:ring-offset-drowable-surface disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isActivating || activationCode.length !== 6}
                        type="submit"
                      >
                        {isActivating ? (
                          "Activating account..."
                        ) : (
                          <>
                            Activate account
                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 transition-transform group-hover:translate-x-0.5"
                            />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-drowable-outline-variant bg-drowable-surface-container-high text-drowable-primary shadow-lg shadow-drowable-indigo/10">
                    <Sparkles aria-hidden="true" className="size-5" />
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-drowable-tertiary">
                    Start creating
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight">Create your account</h2>
                  <p className="mt-2 text-sm leading-6 text-drowable-on-surface-variant">
                    Make a space for your ideas and the people you make them with.
                  </p>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-3">
                  <button
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low px-3 text-sm font-medium transition-colors hover:bg-drowable-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drowable-primary"
                    onClick={() =>
                      setNotice(
                        "Google sign-up is not connected yet. Your details have not been sent.",
                      )
                    }
                    type="button"
                  >
                    <GoogleMark />
                    Google
                  </button>
                  <button
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low px-3 text-sm font-medium transition-colors hover:bg-drowable-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drowable-primary"
                    onClick={() =>
                      setNotice(
                        "GitHub sign-up is not connected yet. Your details have not been sent.",
                      )
                    }
                    type="button"
                  >
                    <Github aria-hidden="true" className="size-4" />
                    GitHub
                  </button>
                </div>

                <div className="relative my-6 flex items-center justify-center">
                  <div className="w-full border-t border-drowable-outline-variant/70" />
                  <span className="absolute bg-drowable-surface px-3 text-[11px] font-medium uppercase tracking-[0.14em] text-drowable-on-surface-variant">
                    or use your email
                  </span>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="first-name">
                        First name
                      </label>
                      <input
                        autoComplete="given-name"
                        className="h-11 w-full rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low px-3 text-sm outline-none transition placeholder:text-drowable-outline focus:border-drowable-primary focus:ring-2 focus:ring-drowable-primary/20"
                        id="first-name"
                        name="firstName"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="last-name">
                        Last name
                      </label>
                      <input
                        autoComplete="family-name"
                        className="h-11 w-full rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low px-3 text-sm outline-none transition placeholder:text-drowable-outline focus:border-drowable-primary focus:ring-2 focus:ring-drowable-primary/20"
                        id="last-name"
                        name="lastName"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="user-name">
                      Username
                    </label>
                    <input
                      autoComplete="username"
                      className="h-11 w-full rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low px-3 text-sm outline-none transition placeholder:text-drowable-outline focus:border-drowable-primary focus:ring-2 focus:ring-drowable-primary/20"
                      id="user-name"
                      name="userName"
                      placeholder="Choose a username"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="email">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-drowable-outline"
                      />
                      <input
                        autoComplete="email"
                        className="h-11 w-full rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low pl-10 pr-3 text-sm outline-none transition placeholder:text-drowable-outline focus:border-drowable-primary focus:ring-2 focus:ring-drowable-primary/20"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="phone">
                      Phone number
                    </label>
                    <input
                      autoComplete="tel"
                      className="h-11 w-full rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low px-3 text-sm outline-none transition placeholder:text-drowable-outline focus:border-drowable-primary focus:ring-2 focus:ring-drowable-primary/20"
                      id="phone"
                      name="phone"
                      placeholder="+1 555 0100"
                      required
                      type="tel"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="country-id">
                        Country
                      </label>
                      <select
                        className="h-11 w-full rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low px-3 text-sm outline-none transition placeholder:text-drowable-outline focus:border-drowable-primary focus:ring-2 focus:ring-drowable-primary/20"
                        id="country-id"
                        name="countryId"
                        required
                        defaultValue=""
                      >
                        <option disabled value="">
                          Select your country
                        </option>
                        {countries.map((country) => (
                          <option key={country.countryId} value={country.countryId}>
                            {country.name} ({country.phonNumberCode})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium" htmlFor="date-of-birth">
                        Date of birth
                      </label>
                      <input
                        autoComplete="bday"
                        className="h-11 w-full rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low px-3 text-sm outline-none transition focus:border-drowable-primary focus:ring-2 focus:ring-drowable-primary/20"
                        id="date-of-birth"
                        name="dateOfBirth"
                        type="date"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="gender">
                      Gender{" "}
                      <span className="font-normal text-drowable-on-surface-variant">
                        (optional)
                      </span>
                    </label>
                    <select
                      className="h-11 w-full rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low px-3 text-sm outline-none transition focus:border-drowable-primary focus:ring-2 focus:ring-drowable-primary/20"
                      id="gender"
                      name="gender"
                      defaultValue=""
                    >
                      <option value="Other">Prefer not to say</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <LockKeyhole
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-drowable-outline"
                      />
                      <input
                        autoComplete="new-password"
                        className="h-11 w-full rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low py-2 pl-10 pr-11 text-sm outline-none transition placeholder:text-drowable-outline focus:border-drowable-primary focus:ring-2 focus:ring-drowable-primary/20"
                        id="password"
                        minLength={8}
                        name="password"
                        placeholder="At least 8 characters"
                        required
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-drowable-on-surface-variant transition-colors hover:bg-drowable-surface-container-high hover:text-drowable-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drowable-primary"
                        onClick={() => setShowPassword((visible) => !visible)}
                        type="button"
                      >
                        {showPassword ? (
                          <EyeOff aria-hidden="true" className="size-4" />
                        ) : (
                          <Eye aria-hidden="true" className="size-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-drowable-on-surface-variant">
                      Use at least 8 characters.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium" htmlFor="confirm-password">
                      Confirm password
                    </label>
                    <input
                      autoComplete="new-password"
                      className="h-11 w-full rounded-lg border border-drowable-outline-variant bg-drowable-surface-container-low px-3 text-sm outline-none transition placeholder:text-drowable-outline focus:border-drowable-primary focus:ring-2 focus:ring-drowable-primary/20"
                      id="confirm-password"
                      minLength={8}
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                      required
                      type="password"
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-5 text-drowable-on-surface-variant">
                    <input
                      className="mt-0.5 size-4 shrink-0 accent-drowable-indigo"
                      name="enableNotifications"
                      type="checkbox"
                    />
                    <span>Send me product updates and notifications.</span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-5 text-drowable-on-surface-variant">
                    <input
                      className="mt-0.5 size-4 shrink-0 accent-drowable-indigo"
                      name="terms"
                      required
                      type="checkbox"
                    />
                    <span>
                      I agree to the{" "}
                      <a
                        className="font-medium text-drowable-primary hover:underline"
                        href="#terms"
                        onClick={(event) => {
                          event.preventDefault();
                          setNotice("The Terms of Service page is not available in this preview.");
                        }}
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        className="font-medium text-drowable-primary hover:underline"
                        href="#privacy"
                        onClick={(event) => {
                          event.preventDefault();
                          setNotice("The Privacy Policy page is not available in this preview.");
                        }}
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>

                  {notice && (
                    <p
                      aria-live="polite"
                      className="rounded-lg border border-drowable-tertiary/30 bg-drowable-tertiary/10 px-3 py-2.5 text-sm text-drowable-on-surface"
                      role="status"
                    >
                      {notice}
                    </p>
                  )}

                  <button
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-drowable-indigo px-4 text-sm font-semibold text-white shadow-lg shadow-drowable-indigo/20 transition hover:bg-drowable-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-drowable-primary focus-visible:ring-offset-2 focus-visible:ring-offset-drowable-surface disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? (
                      "Creating account..."
                    ) : (
                      <>
                        Create account
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 transition-transform group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-6 flex items-center justify-center gap-2 text-xs text-drowable-on-surface-variant">
                  <LockKeyhole aria-hidden="true" className="size-3.5" />
                  Your information stays private and secure.
                </p>
              </>
            )}
          </div>

          <footer className="flex justify-center gap-5 pb-1 text-xs text-drowable-on-surface-variant">
            <a
              className="transition-colors hover:text-drowable-on-surface"
              href="#privacy"
              onClick={(event) => {
                event.preventDefault();
                setNotice("The Privacy Policy page is not available in this preview.");
              }}
            >
              Privacy
            </a>
            <a
              className="transition-colors hover:text-drowable-on-surface"
              href="#terms"
              onClick={(event) => {
                event.preventDefault();
                setNotice("The Terms of Service page is not available in this preview.");
              }}
            >
              Terms
            </a>
            <a
              className="transition-colors hover:text-drowable-on-surface"
              href="mailto:support@drowable.com"
            >
              Help
            </a>
          </footer>
        </section>
      </div>
    </main>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
        fill="var(--drowable-google-blue)"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
        fill="var(--drowable-google-green)"
      />
      <path
        d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.15a11 11 0 0 0 0 9.9l3.69-2.84Z"
        fill="var(--drowable-google-yellow)"
      />
      <path
        d="M12 4.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0a11 11 0 0 0-9.85 7.05l3.69 2.84C6.71 7.29 9.14 4.36 12 4.36Z"
        fill="var(--drowable-google-red)"
      />
    </svg>
  );
}
