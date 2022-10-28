import { getDefaultProvider, Signer } from 'ethers';
import React, { createContext, useContext, useState } from 'react';
import { BaseProvider } from '../types';

const defaultChainDict: Record<string, string> = {
  '0x1': 'Mainnet',
  '0x3': 'Ropsten',
  '0x4': 'Rinkeby',
  '0x5': 'Goerli',
  '0x2a': 'Kovan'
};

export type Web3Context = {
  address?: string;
  chainId?: string;
  chainDict: Record<string, string>;
  provider: BaseProvider;
  signer?: Signer;
  setAddress: (address: string | undefined) => void;
  setChainId: (chainID: string | undefined) => void;
};

const defaultProvider = getDefaultProvider();

const Web3Context = createContext<Web3Context>({
  setAddress: () => null,
  setChainId: () => null,
  chainDict: defaultChainDict,
  provider: defaultProvider
});

type Props = Partial<
  Pick<Web3Context, 'address' | 'chainId' | 'provider' | 'chainDict' | 'signer'>
> & {
  children: React.ReactNode;
};

export const Web3Provider = ({
  children,
  address: initialAddress,
  chainId: initialChainId,
  provider = defaultProvider,
  signer,
  chainDict = {}
}: Props) => {
  const [address, setAddress] = useState<string | undefined>(initialAddress);
  const [chainId, setChainId] = useState<string | undefined>(initialChainId);

  const context: Web3Context = {
    address,
    chainId,
    setAddress,
    setChainId,
    provider,
    signer,
    chainDict: { ...defaultChainDict, ...chainDict }
  };

  return (
    <Web3Context.Provider value={context}>{children}</Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3Context => useContext(Web3Context);
