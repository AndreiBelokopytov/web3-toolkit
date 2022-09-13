import { useCallback, useEffect, useRef, useState } from 'react';
import { MetaMaskOnboardingStatus as OnboardingStatus } from './MetaMaskOnboardingStatus';
import MetaMaskOnboarding from '@metamask/onboarding';
import { ethereum } from '../../providers/ethereum';

type MetaMaskOnboardingState = {
  status: OnboardingStatus;
  accounts: string[];
};

type MetaMaskAdapter = {
  onboardingState: MetaMaskOnboardingState;
  connect: () => void;
};

export function useMetaMask(): MetaMaskAdapter {
  const metaMaskOnboarding = useRef<MetaMaskOnboarding>(
    new MetaMaskOnboarding()
  );

  const initialStatus = MetaMaskOnboarding.isMetaMaskInstalled()
    ? OnboardingStatus.notConnected
    : OnboardingStatus.notInstalled;
  const [onboardingState, setOnboardingState] =
    useState<MetaMaskOnboardingState>({
      status: initialStatus,
      accounts: []
    });

  const handleAccountsChanded = useCallback((accounts: string[]) => {
    setOnboardingState({
      status: OnboardingStatus.connected,
      accounts
    });
    metaMaskOnboarding.current?.stopOnboarding();
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      ethereum.on('accountsChanged', handleAccountsChanded);
    }

    return () => {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        ethereum.removeListener('accountsChanged', handleAccountsChanded);
      }
    };
  }, [handleAccountsChanded]);

  const connect = useCallback(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setOnboardingState({
        status: OnboardingStatus.connecting,
        accounts: []
      });
      ethereum
        .request({
          method: 'eth_requestAccounts'
        })
        .then(handleAccountsChanded);
    } else {
      setOnboardingState({
        status: OnboardingStatus.onboarding,
        accounts: []
      });
      metaMaskOnboarding.current?.startOnboarding();
    }
  }, [handleAccountsChanded]);

  return { onboardingState, connect };
}
