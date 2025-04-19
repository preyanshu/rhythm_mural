"use client";
import { useAccount, useChainId } from "wagmi";
import { useState, Fragment } from "react";
import { network } from "../config";
import HomeScreen from "@/components/home_screen";
import { Popover, Transition } from "@headlessui/react";
import { WalletIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const { isConnected } = useAccount();
  const chain = useChainId();
  const isCorrectNetwork = chain === network.id;

  if (isConnected && isCorrectNetwork) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-gray-950 px-4 py-8 w-full">
        
        {/* Toolbar only on small and medium screens */}
        <div className="w-full max-w-5xl flex items-center justify-end gap-4 px-4 mb-2 lg:hidden">
          {/* Network Change Button */}
          <appkit-network-button />

          {/* Wallet Popover */}
          <Popover className="relative">
            <Popover.Button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <WalletIcon className="w-6 h-6 text-gray-200" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-0 mt-2 z-50 bg-gray-900 border border-gray-700 p-4 rounded-xl shadow-xl">
                <appkit-button />
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>

        {/* HomeScreen visible on all sizes */}
        <HomeScreen />
      </div>
    );
  }

  // Not connected or wrong network
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
