// utils/deployToken.ts
// 用于调用 MemeFactory 合约，部署新 MemeToken

import { ethers } from 'ethers';
import MemeFactoryABI from '../abis/MemeFactory.json'; // 你自己导出的 ABI 路径
const FACTORY_ADDRESS = '0xYourDeployedFactoryAddress'; // 替换为你部署的工厂地址

export async function deployMemeToken(
  name: string,
  symbol: string,
  audioURI: string,
  signer: ethers.Signer
): Promise<string> {
  const factory = new ethers.Contract(FACTORY_ADDRESS, MemeFactoryABI, signer);
  const tx = await factory.createMemeToken(name, symbol, audioURI);
  const receipt = await tx.wait();

  const event = receipt.events?.find((e) => e.event === 'MemeTokenCreated');
  const newTokenAddress = event?.args?.tokenAddress;

  if (!newTokenAddress) throw new Error('代币部署失败');

  return newTokenAddress;
}
