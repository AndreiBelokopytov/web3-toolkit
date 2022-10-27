import { Contract, ContractInterface, providers, Signer } from 'ethers';
import { useRef } from 'react';
import { isMetaMaskInstalled, metaMask } from '../../walletApi';
import { useProvider } from '../useProvider';

const defaultSigner: Signer | undefined = (() => {
  if (isMetaMaskInstalled(metaMask)) {
    return new providers.Web3Provider(metaMask).getSigner();
  }
  return undefined;
})();

export const useContract = (address: string, abi: ContractInterface) => {
  const provider = useProvider();
  const contract = useRef(new Contract(address, abi, provider)).current;
  return contract;
};

export const useWritableContract = (
  address: string,
  abi: ContractInterface,
  signer: Signer | undefined
) => {
  if (!signer && !defaultSigner) {
    throw new Error(
      'Can not init writable contract because no signer provided and MetaMask is not installed'
    );
  }
  const contract = useRef(
    new Contract(address, abi, signer ?? defaultSigner)
  ).current;
  return contract;
};
