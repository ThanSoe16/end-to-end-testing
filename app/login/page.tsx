"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Eye, EyeOff, Mail, Lock, Chrome, Github } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormErrors = z.ZodFormattedError<z.infer<typeof loginSchema>>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginFormErrors | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setErrors(result.error.format());
      return;
    }

    setErrors(null);
    console.log("Login submitted:", result.data);
  };

  const clearFieldError = (field: keyof z.infer<typeof loginSchema>) => {
    if (errors?.[field]) {
      setErrors((prev) => {
        if (!prev) return null;
        return { ...prev, [field]: undefined };
      });
    }
  };

  return (
    <div id="login-page" className="flex min-h-screen">
      {/* Left branding panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-12 lg:flex lg:w-1/2">
        {/* Floating orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/3 h-72 w-72 animate-pulse rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-indigo-500/10 blur-3xl [animation-delay:2s]" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            ACME
          </span>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <h2
            id="login-branding-title"
            className="max-w-md text-4xl font-extrabold leading-tight tracking-tight text-white"
          >
            Start building
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              amazing products
            </span>
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-white/50">
            Join thousands of teams who trust ACME to power their next big idea.
          </p>
        </div>

        {/* Bottom text */}
        <p className="relative z-10 text-sm text-white/30">
          © 2026 ACME Inc. All rights reserved.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex w-full flex-col items-center justify-center bg-[#0a0a1a] px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600">
              <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              ACME
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1
              id="login-title"
              className="text-3xl font-extrabold tracking-tight text-white"
            >
              Welcome back
            </h1>
            <p className="mt-2 text-base text-white/40">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form
            id="login-form"
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            {/* Email Field */}
            <Field data-invalid={!!errors?.email}>
              <FieldLabel
                htmlFor="login-email"
                className="text-sm text-white/70"
              >
                Email address
              </FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  className="rounded-xl border-white/10 bg-white/5 pl-11 text-white placeholder:text-white/25 focus:border-violet-500/50 focus:ring-violet-500/20"
                />
              </div>
              <FieldError
                id="login-email-error"
                errors={errors?.email?._errors?.slice(0, 1).map((msg) => ({
                  message: msg,
                }))}
              />
            </Field>

            {/* Password Field */}
            <Field data-invalid={!!errors?.password}>
              <div className="flex items-center justify-between">
                <FieldLabel
                  htmlFor="login-password"
                  className="text-sm text-white/70"
                >
                  Password
                </FieldLabel>
                <Link
                  href="#"
                  id="login-forgot-password"
                  className="text-sm text-violet-400 transition-colors hover:text-violet-300"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError("password");
                  }}
                  className="rounded-xl border-white/10 bg-white/5 pl-11 pr-11 text-white placeholder:text-white/25 focus:border-violet-500/50 focus:ring-violet-500/20"
                />
                <button
                  id="login-toggle-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <FieldError
                id="login-password-error"
                errors={errors?.password?._errors?.slice(0, 1).map((msg) => ({
                  message: msg,
                }))}
              />
            </Field>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                id="login-remember"
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-violet-500 focus:ring-violet-500/30"
              />
              <label
                htmlFor="login-remember"
                className="text-sm text-white/50 select-none"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <Button
              id="login-submit"
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-5 text-base font-semibold shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/40"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/30">or continue with</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Social logins */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              id="login-google"
              type="button"
              variant="outline"
              className="cursor-pointer rounded-xl border-white/10 bg-white/5 py-5 text-sm text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              id="login-github"
              type="button"
              variant="outline"
              className="cursor-pointer rounded-xl border-white/10 bg-white/5 py-5 text-sm text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-white/40">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              id="login-sign-up"
              className="font-medium text-violet-400 transition-colors hover:text-violet-300"
            >
              Create one for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
