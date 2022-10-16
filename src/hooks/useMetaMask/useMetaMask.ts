import { useCallback, useEffect, useRef, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { metaMaskProvider } from '../../providers';

export type OnBoardingStateStatus =
  | 'notInstalled'
  | 'notConnected'
  | 'onboarding'
  | 'connecting'
  | 'connected';

type OnboardingState = {
  status: OnBoardingStateStatus;
  accounts: string[];
  chainId?: string;
  error?: string;
};

type Result = OnboardingState & {
  isNotInstalled: boolean;
  isNotConnected: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  isOnboarding: boolean;
  connect: () => void;
};

export function useMetaMask(): Result {
  const metaMaskOnboarding = useRef<MetaMaskOnboarding>(
    new MetaMaskOnboarding()
  );

  const initialState: OnboardingState = MetaMaskOnboarding.isMetaMaskInstalled()
    ? {
        status: 'notConnected',
        accounts: []
      }
    : {
        status: 'notInstalled',
        accounts: []
      };

  const [onboardingState, setOnboardingState] =
    useState<OnboardingState>(initialState);

  const handleAccountsChanded = useCallback(
    (accounts: string[]) => {
      if (accounts.length > 0) {
        setOnboardingState((prevState) => ({
          ...prevState,
          status: 'connected',
          accounts
        }));
      } else {
        setOnboardingState((prevState) => ({
          ...prevState,
          status: 'notConnected',
          accounts: []
        }));
      }

      metaMaskOnboarding.current?.stopOnboarding();
    },
    [setOnboardingState]
  );

  const handleChainChanged = useCallback(
    (chainId: string) =>
      setOnboardingState((prevState) => ({
        ...prevState,
        chainId
      })),
    []
  );

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      metaMaskProvider.on('accountsChanged', handleAccountsChanded);
      metaMaskProvider.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        metaMaskProvider.removeListener(
          'accountsChanged',
          handleAccountsChanded
        );
        metaMaskProvider.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [handleAccountsChanded, handleChainChanged]);

  const connect = useCallback(async () => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      setOnboardingState((prevState) => ({
        ...prevState,
        status: 'onboarding',
        accounts: []
      }));
      metaMaskOnboarding.current?.startOnboarding();
      return;
    }

    setOnboardingState((prevState) => ({
      ...prevState,
      status: 'connecting',
      accounts: [],
      error: undefined
    }));
    try {
      const accounts = await metaMaskProvider.request({
        method: 'eth_requestAccounts'
      });
      handleAccountsChanded(accounts);
      const chainId = await metaMaskProvider.request({
        method: 'eth_chainId'
      });
      handleChainChanged(chainId);
    } catch (err) {
      let message: string | undefined;
      if (err instanceof Error) {
        message = err?.message;
      }
      if (typeof err === 'string') {
        message = err;
      }
      setOnboardingState((prevState) => ({
        ...prevState,
        status: 'notConnected',
        error: message
      }));
    }
  }, [handleAccountsChanded, handleChainChanged]);

  return {
    ...onboardingState,
    isNotInstalled: onboardingState.status === 'notInstalled',
    isNotConnected: onboardingState.status === 'notConnected',
    isConnected: onboardingState.status === 'connected',
    isConnecting: onboardingState.status === 'connecting',
    isOnboarding: onboardingState.status === 'onboarding',
    connect
  };
}
