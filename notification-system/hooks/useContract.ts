import { BrowserProvider, Contract, JsonRpcSigner } from 'ethers';

declare global {
  interface Window {
    ethereum?: import('ethers').Eip1193Provider;
  }
}

const getContract = async (): Promise<Contract> => {
  if (!window.ethereum) {
    throw new Error('Ethereum provider not found');
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer: JsonRpcSigner = await provider.getSigner();

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "0xDefaultContractAddress";
  const abi = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI || '[]');

  return new Contract(contractAddress, abi, signer);
};

export default getContract;