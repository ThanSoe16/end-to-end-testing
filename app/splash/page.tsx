"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      id="splash-screen"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"
    >
      {/* Animated background orbs */}
      <div className="absolute top-1/4 -left-20 h-72 w-72 animate-pulse rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute -right-20 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-indigo-600/20 blur-3xl [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-600/10 blur-3xl [animation-delay:2s]" />

      {/* Logo */}
      <div className="animate-[bounce_2s_ease-in-out_infinite] mb-8">
        <div
          id="splash-logo"
          className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-2xl shadow-violet-500/30"
        >
          <Zap className="h-12 w-12 text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* App name */}
      <h1
        id="splash-app-name"
        className="animate-[fadeInUp_1s_ease-out_0.5s_both] bg-gradient-to-r from-white via-violet-200 to-indigo-200 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent"
      >
        ACME
      </h1>

      {/* Tagline */}
      <p
        id="splash-tagline"
        className="animate-[fadeInUp_1s_ease-out_1s_both] mt-4 text-lg font-medium tracking-wide text-violet-300/80"
      >
        Build Something Extraordinary
      </p>

      {/* Loading bar */}
      <div className="animate-[fadeInUp_1s_ease-out_1.5s_both] mt-16 w-48">
        <div className="h-1 overflow-hidden rounded-full bg-white/10">
          <div
            id="splash-loading-bar"
            className="h-full animate-[loading_2.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes loading {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 60%;
            margin-left: 20%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
