import { BigNumber, Contract } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useProvider } from '../useProvider';

type TokenBalanceState = {
  balance: BigNumber;
  isLoading: boolean;
  error?: string;
};

type TokenBalance = TokenBalanceState & {
  refresh: () => void;
};

const abi = ['function balanceOf(address owner) view returns (uint256)'];

export const useTokenBalance = (
  contractAddress: string,
  address: string
): TokenBalance => {
  const provider = useProvider();
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
      error: undefined
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
        isLoading: false,
        error: errorMessage
      }));
    }
  }, [address, contract]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...state, refresh };
};
