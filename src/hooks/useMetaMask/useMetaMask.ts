import { useCallback, useEffect, useRef, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useWeb3 } from '../../providers/Web3Provider';
import { metaMask } from './metaMask';
import { getErrorMessage } from '../../utils';

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
};

export function useMetaMask(): Result {
  const metaMaskOnboarding = useRef<MetaMaskOnboarding>(
    new MetaMaskOnboarding()
  );
  const { setAddress, setChainId } = useWeb3();

  const initialState: OnboardingState = MetaMaskOnboarding.isMetaMaskInstalled()
    ? {
        status: 'notConnected'
      }
    : {
        status: 'notInstalled'
      };

  const [onboardingState, setOnboardingState] =
    useState<OnboardingState>(initialState);

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

      metaMaskOnboarding.current?.stopOnboarding();
    },
    [setAddress]
  );

  const handleChainChanged = useCallback(
    (chainId: string) => setChainId(chainId),
    [setChainId]
  );

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      metaMask.on('accountsChanged', handleAccountsChanded);
      metaMask.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        metaMask.removeListener('accountsChanged', handleAccountsChanded);
        metaMask.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [handleAccountsChanded, handleChainChanged]);

  const connect = useCallback(async () => {
    if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
      setOnboardingState((prevState) => ({
        ...prevState,
        status: 'onboarding'
      }));
      metaMaskOnboarding.current?.startOnboarding();
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
