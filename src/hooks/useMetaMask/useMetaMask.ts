import { useCallback, useEffect } from 'react';
import { useWeb3 } from '../../providers/Web3Provider';
import {
  metaMask,
  startOnboarding,
  stopOnboarding,
  isMetaMaskInstalled
} from '../../walletApi';
import { getErrorMessage, useSafeState } from '../../utils';

export type OnBoardingStateStatus =
  | 'notInstalled'
  | 'notConnected'
  | 'onboarding'
  | 'connecting'
  | 'connected';

type OnboardingState = {
  status: OnBoardingStateStatus;
  error?: string;
};

type Result = OnboardingState & {
  isNotInstalled: boolean;
  isNotConnected: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  isOnboarding: boolean;
  connect: () => void;
  disconnect: () => void;
};

export function useMetaMask(): Result {
  const { setAddress, setChainId } = useWeb3();

  const initialState: OnboardingState = isMetaMaskInstalled(metaMask)
    ? {
        status: 'notConnected'
      }
    : {
        status: 'notInstalled'
      };

  const [onboardingState, setOnboardingState] =
    useSafeState<OnboardingState>(initialState);

  const handleAccountsChanded = useCallback(
    (accounts: string[]) => {
      if (accounts.length > 0) {
        setOnboardingState((prevState) => ({
          ...prevState,
          status: 'connected'
        }));
        setAddress(accounts[0]);
      } else {
        setOnboardingState((prevState) => ({
          ...prevState,
          status: 'notConnected'
        }));
        setAddress(undefined);
      }

      stopOnboarding();
    },
    [setAddress, setOnboardingState]
  );

  const handleChainChanged = useCallback(
    (chainId?: string) => setChainId(chainId),
    [setChainId]
  );

  useEffect(() => {
    if (isMetaMaskInstalled(metaMask)) {
      metaMask.on('accountsChanged', handleAccountsChanded);
      metaMask.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (isMetaMaskInstalled(metaMask)) {
        metaMask.removeListener('accountsChanged', handleAccountsChanded);
        metaMask.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [handleAccountsChanded, handleChainChanged]);

  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled(metaMask)) {
      setOnboardingState((prevState) => ({
        ...prevState,
        status: 'onboarding'
      }));
      startOnboarding();
      return;
    }

    setOnboardingState((prevState) => ({
      ...prevState,
      status: 'connecting',
      error: undefined
    }));
    try {
      const accounts = await metaMask.request({
        method: 'eth_requestAccounts'
      });
      handleAccountsChanded(accounts);
      const chainId = await metaMask.request({
        method: 'eth_chainId'
      });
      handleChainChanged(chainId);
    } catch (err) {
      setOnboardingState((prevState) => ({
        ...prevState,
        status: 'notConnected',
        error: getErrorMessage(err)
      }));
    }
  }, [handleAccountsChanded, handleChainChanged, setOnboardingState]);

  const disconnect = useCallback(() => {
    handleAccountsChanded([]);
    handleChainChanged(undefined);
  }, [handleAccountsChanded, handleChainChanged]);

  return {
    ...onboardingState,
    isNotInstalled: onboardingState.status === 'notInstalled',
    isNotConnected: onboardingState.status === 'notConnected',
    isConnected: onboardingState.status === 'connected',
    isConnecting: onboardingState.status === 'connecting',
    isOnboarding: onboardingState.status === 'onboarding',
    connect,
    disconnect
  };
}
