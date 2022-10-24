import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../../utils';
import { useProvider } from '../useProvider';

type State = {
  balance?: BigNumber;
  isLoading: boolean;
  error?: string;
};

export const useWalletBalance = (address: string): State => {
  const [state, setState] = useState<State>({
    isLoading: false
  });
  const provider = useProvider();

  const fetchBalance = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: undefined
    }));
    try {
      const balance = await provider.getBalance(address);
      setState((prevState) => ({
        ...prevState,
        balance,
        isLoading: false
      }));
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: getErrorMessage(err)
      }));
    }
  }, [address, provider]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    provider.on('block', fetchBalance);
    return () => {
      provider.off('block', fetchBalance);
    };
  }, [provider, fetchBalance]);

  return state;
};
