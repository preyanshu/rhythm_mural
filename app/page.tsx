"use client";
import { useAccount, useChainId } from "wagmi";
import { network } from "../config";
import HomeScreen from "@/components/home_screen";

export default function Home() {
  const { isConnected } = useAccount();
  const chain = useChainId();

  const isCorrectNetwork = chain === network.id;

  if (isConnected && isCorrectNetwork) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4 py-8 gap-4">
        <div className="flex gap-4">
          <appkit-button />
          <appkit-network-button  />
        </div>
        <HomeScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-8">
      <div className="max-w-md w-full rounded-2xl bg-gray-900 p-8 shadow-xl border border-gray-800 text-gray-200 transition-all duration-300">
        <h1 className="text-3xl font-bold text-purple-400 mb-4 text-center">
          {isConnected ? "Connected" : "Connect Your Wallet"}
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          {isConnected
            ? "You're on the wrong network. Please switch to the correct one."
            : "Connect your wallet to get started."}
        </p>

        <div className="flex justify-center">
          {isConnected ? (
            <div className="bg-purple-600 px-4 py-2 rounded-lg">
              <appkit-network-button />
            </div>
          ) : (
            <appkit-button size="md" />
          )}
        </div>
      </div>
    </div>
  );
}
