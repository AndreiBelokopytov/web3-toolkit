import { BigNumber } from 'ethers';
import { useCallback, useEffect } from 'react';
import { getErrorMessage, useSafeState } from '../../utils';
import { useProvider } from '../useProvider';

type State = {
  balance?: BigNumber;
  isLoading: boolean;
  error?: string;
};

type Options = {
  refreshOnBlock?: boolean;
};

export const useWalletBalance = (
  address: string,
  { refreshOnBlock }: Options | undefined = {}
): State => {
  const [state, setState] = useSafeState<State>({
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
    if (refreshOnBlock) {
      provider.on('block', fetchBalance);
    }
    return () => {
      if (refreshOnBlock) {
        provider.off('block', fetchBalance);
      }
    };
  }, [provider, fetchBalance, refreshOnBlock]);

  return state;
};
