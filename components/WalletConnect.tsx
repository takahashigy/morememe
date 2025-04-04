// components/WalletConnect.tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  return (
    <div className="absolute top-4 right-4">
      {isConnected ? (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-green-300">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
          <button onClick={() => disconnect()} className="text-sm bg-red-500 px-2 py-1 rounded">
            断开
          </button>
        </div>
      ) : (
        <button
          onClick={() => connect()}
          className="text-sm bg-green-500 px-3 py-1 rounded hover:bg-green-400"
        >
          连接钱包
        </button>
      )}
    </div>
  );
}
