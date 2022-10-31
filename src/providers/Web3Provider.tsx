import { getDefaultProvider, Signer } from 'ethers';
import React, { createContext, useContext } from 'react';
import { BaseProvider } from '../types';
import { useSafeState } from '../utils';

export type Web3Context = {
  address?: string;
  chainId?: string;
  provider: BaseProvider;
  signer?: Signer;
  setAddress: (address: string | undefined) => void;
  setChainId: (chainID: string | undefined) => void;
};

const defaultProvider = getDefaultProvider();

const Web3Context = createContext<Web3Context>({
  setAddress: () => null,
  setChainId: () => null,
  provider: defaultProvider
});

type Props = Partial<
  Pick<Web3Context, 'address' | 'chainId' | 'provider' | 'signer'>
> & {
  children: React.ReactNode;
};

export const Web3Provider = ({
  children,
  address: initialAddress,
  chainId: initialChainId,
  provider = defaultProvider,
  signer
}: Props) => {
  const [address, setAddress] = useSafeState<string | undefined>(
    initialAddress
  );
  const [chainId, setChainId] = useSafeState<string | undefined>(
    initialChainId
  );

  const context: Web3Context = {
    address,
    chainId,
    setAddress,
    setChainId,
    provider,
    signer
  };

  return (
    <Web3Context.Provider value={context}>{children}</Web3Context.Provider>
  );
};

export const useWeb3 = (): Web3Context => useContext(Web3Context);
