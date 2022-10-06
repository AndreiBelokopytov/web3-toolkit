import { BigNumber, Contract, getDefaultProvider } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';

type TokenBalanceState = {
  balance: BigNumber;
  isLoading: boolean;
  errorMessage?: string;
};

type TokenBalance = TokenBalanceState & {
  refresh: () => void;
};

const abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function transfer(address to, uint amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint amount)'
];

export const useTokenBalance = (
  contractAddress: string,
  address: string,
  provider: ReturnType<typeof getDefaultProvider>
): TokenBalance => {
  const contract = useMemo(() => {
    return new Contract(contractAddress, abi, provider);
  }, [contractAddress, provider]);

  const [state, setState] = useState<TokenBalanceState>({
    balance: BigNumber.from(0),
    isLoading: true
  });

  const refresh = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      errorMessage: undefined
    }));
    try {
      const balance = await contract.balanceOf(address);
      setState((prevState) => ({
        ...prevState,
        balance,
        isLoading: false
      }));
    } catch (err) {
      let errorMessage: string | undefined;
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      if (typeof err === 'string') {
        errorMessage = err;
      }
      setState((prevState) => ({
        ...prevState,
        errorMessage
      }));
    }
  }, [address, contract]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...state, refresh };
};
