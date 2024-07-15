"use client";
import DashboardPage from "@/components/dashboard";
import LandingPage from "@/components/landing";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      // router.push('explorer')
    }
  }, [address, router]);

  return (
    <main className="fancy-overlay min-h-screen">
      {!address ? <LandingPage /> : <DashboardPage />}
    </main>
  );
}
