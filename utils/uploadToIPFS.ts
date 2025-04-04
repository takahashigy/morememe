// utils/uploadToIPFS.ts
// 将音频文件上传至 Web3.Storage（IPFS）

export async function uploadToIPFS(file: File, token: string): Promise<string> {
  const endpoint = 'https://api.web3.storage/upload';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: file,
  });

  if (!res.ok) throw new Error('Upload failed');

  const data = await res.json();
  return `https://ipfs.io/ipfs/${data.cid}`;
}
