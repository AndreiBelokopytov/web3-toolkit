import { getDefaultProvider } from 'ethers';
import React, { createContext, useContext, useState } from 'react';

const defaultChainDict: Record<string, string> = {
  '0x1': 'Mainnet',
  '0x3': 'Ropsten',
  '0x4': 'Rinkeby',
  '0x5': 'Goerli',
  '0x2a': 'Kovan'
};

type BaseProvider = ReturnType<typeof getDefaultProvider>;

export type Web3Context = {
  address?: string;
  chainId?: string;
  chainDict: Record<string, string>;
  provider?: BaseProvider;
  setAddress: (address: string | undefined) => void;
  setChainId: (chainID: string | undefined) => void;
};

const Web3Context = createContext<Web3Context>({
  setAddress: () => null,
  setChainId: () => null,
  chainDict: defaultChainDict
});

type Props = Pick<Web3Context, 'address' | 'chainId' | 'provider'> & {
  chainDict?: Record<string, string>;
  children: React.ReactNode;
};

export const Web3Provider = ({
  children,
  address: initialAddress,
  chainId: initialChainId,
  provider,
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
    chainDict: { ...defaultChainDict, ...chainDict }
  };

  return (
    <Web3Context.Provider value={context}>{children}</Web3Context.Provider>
  );
};

export const useWeb3Context = (): Web3Context => useContext(Web3Context);
