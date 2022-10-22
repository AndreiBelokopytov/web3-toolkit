import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '../../utils';
import { useProvider } from '../useProvider';

type State = {
  balance: BigNumber;
  isLoading: boolean;
  error?: string;
};

export const useWalletBalance = (address: string): State => {
  const [state, setState] = useState<State>({
    balance: BigNumber.from(0),
    isLoading: false
  });
  const provider = useProvider();

  useEffect(() => {
    (async function fetchBalance() {
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
    })();
  }, [address, provider]);

  return state;
};
