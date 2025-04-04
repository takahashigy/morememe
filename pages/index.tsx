// pages/index.tsx
import { useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import WalletConnect from '../components/WalletConnect';
import AudioPlayer from '../components/AudioPlayer';
import { uploadToIPFS } from '../utils/uploadToIPFS';
import { deployMemeToken } from '../utils/deployToken';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [deployedToken, setDeployedToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUploadAndDeploy = async () => {
    if (!isConnected || !signer) return alert('请连接钱包');
    if (!audioFile) return alert('请上传音频');
    if (!name || !symbol) return alert('请输入代币名称和符号');

    const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
    if (!token || token === 'your_web3_storage_api_key_here') {
      return alert('请在 .env.local 设置 Web3.Storage Token');
    }

    try {
      setLoading(true);

      const ipfsUrl = await uploadToIPFS(audioFile, token);
      setAudioUrl(ipfsUrl);

      const newTokenAddress = await deployMemeToken(name, symbol, ipfsUrl, signer);
      setDeployedToken(newTokenAddress);
      alert(`✅ 发币成功：${newTokenAddress}`);
    } catch (err) {
      console.error(err);
      alert('创建失败，请检查控制台');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1f3c2c] text-white p-6 relative">
      <WalletConnect />

      <div className="max-w-md mx-auto mt-10 text-center">
        <img src="/logo.png" className="w-32 mx-auto mb-4" alt="logo" />
        <h1 className="text-3xl font-bold mb-6">🧬 Create Meme Token</h1>

        <input
          className="mb-4 p-2 text-black w-full rounded"
          placeholder="Token Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="mb-4 p-2 text-black w-full rounded"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="file"
          accept="audio/mp3,audio/wav"
          className="mb-4 w-full"
          onChange={(e) => e.target.files && setAudioFile(e.target.files[0])}
        />

        <button
          onClick={handleUploadAndDeploy}
          className="bg-green-600 px-6 py-2 rounded hover:bg-green-500 disabled:opacity-50 w-full"
          disabled={loading}
        >
          {loading ? '上传 & 发币中...' : '上传音频并创建代币'}
        </button>

        {audioUrl && <AudioPlayer url={audioUrl} />}
        {deployedToken && (
          <div className="mt-4 text-sm">
            ✅ 合约地址：<a href={`https://testnet.bscscan.com/address/${deployedToken}`} target="_blank" className="underline text-green-300">{deployedToken}</a>
          </div>
        )}
      </div>
    </div>
  );
}
