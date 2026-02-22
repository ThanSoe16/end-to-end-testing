"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Shield, Rocket, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(hash || "home");
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navItems = [
    { id: "home", label: "Home", href: "/home" },
    { id: "features", label: "Features", href: "#features" },
    { id: "pricing", label: "Pricing", href: "#pricing" },
  ];

  return (
    <div
      id="home-page"
      className="relative min-h-screen overflow-hidden bg-[#0a0a1a] text-white"
    >
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-violet-600/8 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-[30rem] w-[30rem] animate-pulse rounded-full bg-indigo-600/8 blur-3xl [animation-delay:2s]" />
        <div className="absolute left-1/2 top-2/3 h-80 w-80 animate-pulse rounded-full bg-blue-600/6 blur-3xl [animation-delay:4s]" />
      </div>

      {/* Navigation */}
      <nav
        id="home-navbar"
        className="relative z-10 flex items-center justify-between border-b border-white/5 px-6 py-4 backdrop-blur-xl sm:px-12 lg:px-20"
      >
        <Link
          href="/home"
          className="flex items-center gap-2.5"
          onClick={() => setActiveSection("home")}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/20">
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <span
            id="home-logo-text"
            className="text-xl font-bold tracking-tight"
          >
            ACME
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                id={`nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`relative rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-white/10 font-semibold text-white after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:translate-y-2 after:rounded-full after:bg-violet-400"
                    : "font-medium text-white/40 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <Link href="/login">
          <Button
            id="nav-sign-in"
            variant="outline"
            className="cursor-pointer rounded-xl border-white/10 bg-white/5 text-sm text-white backdrop-blur-sm transition-all hover:border-violet-400/30 hover:bg-white/10"
          >
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center px-6 pt-24 pb-20 text-center sm:pt-32 lg:pt-40">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300 backdrop-blur-sm">
          <Rocket className="h-3.5 w-3.5" />
          <span>Now in Public Beta</span>
        </div>

        <h1
          id="home-hero-title"
          className="max-w-4xl bg-gradient-to-b from-white via-white/90 to-white/60 bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent sm:text-6xl lg:text-7xl"
        >
          The Future of
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
            Digital Experience
          </span>
        </h1>

        <p
          id="home-hero-subtitle"
          className="mt-6 max-w-2xl text-lg leading-relaxed text-white/50 sm:text-xl"
        >
          Empower your workflow with cutting-edge tools designed for speed,
          security, and scalability. Build products your users will love.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            id="home-cta-primary"
            className="group cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-6 text-base font-semibold shadow-xl shadow-violet-500/20 transition-all hover:shadow-violet-500/40"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            id="home-cta-secondary"
            variant="outline"
            className="cursor-pointer rounded-xl border-white/10 bg-white/5 px-8 py-6 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
          >
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 px-6 py-20 sm:px-12 lg:px-20"
      >
        <div className="mb-16 text-center">
          <h2
            id="home-features-title"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Everything you need
          </h2>
          <p className="mt-4 text-lg text-white/40">
            Powerful features built for modern teams
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card 1 */}
          <div
            id="feature-card-1"
            className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/20 hover:bg-white/[0.06]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 transition-colors group-hover:from-violet-500/30 group-hover:to-indigo-500/30">
              <Shield className="h-6 w-6 text-violet-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Enterprise Security
            </h3>
            <p className="text-sm leading-relaxed text-white/40">
              Bank-grade encryption and compliance tools to keep your data safe
              and your team productive.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div
            id="feature-card-2"
            className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/20 hover:bg-white/[0.06]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 transition-colors group-hover:from-indigo-500/30 group-hover:to-blue-500/30">
              <Rocket className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Lightning Fast
            </h3>
            <p className="text-sm leading-relaxed text-white/40">
              Optimized for performance with edge computing and intelligent
              caching across 200+ global nodes.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div
            id="feature-card-3"
            className="group rounded-2xl border border-white/5 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.06]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 transition-colors group-hover:from-blue-500/30 group-hover:to-cyan-500/30">
              <BarChart3 className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Real-time Analytics
            </h3>
            <p className="text-sm leading-relaxed text-white/40">
              Deep insights with live dashboards, custom reports, and AI-powered
              predictions at your fingertips.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-8 text-center">
        <p id="home-footer" className="text-sm text-white/30">
          © 2026 ACME Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
