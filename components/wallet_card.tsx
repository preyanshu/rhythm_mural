import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletCard = () => {
  const { userAddr } = useAuth();

  return (
    <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-xl p-6 text-gray-100 flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-purple-400">Connect UXUY Wallet</h2>
      <p className="text-sm text-gray-400 text-center my-3">
        Connect your wallet to get started with UXUY platform.
      </p>

      <div className="mt-4">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {connected? (
                  <button
                    onClick={openAccountModal}
                    className="bg-purple-600  w-full hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg w-48 h-12 transition duration-200"
                  >
                    <b>{account.displayName}</b>
                  </button>
                ) : (
                  <button
                    onClick={openConnectModal}
                    className="bg-purple-500 w-full hover:bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg w-48 h-12 transition duration-200"
                  >
                    <b>Connect Wallet</b>
                  </button>
                )}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>

	  {/* <ConnectButton></ConnectButton> */}

      {userAddr && (
        <div className="mt-4 text-xs text-gray-400 text-center">
          Connected as <span className="text-purple-300">{userAddr}</span>
        </div>
      )}
    </div>
  );
};

export default WalletCard;
