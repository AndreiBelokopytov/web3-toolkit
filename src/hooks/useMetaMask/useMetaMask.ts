import { useCallback, useEffect, useRef, useState } from 'react';
import { MetaMaskOnboardingStatus } from './MetaMaskOnboardingStatus';
import MetaMaskOnboarding from '@metamask/onboarding';
import { ethereum } from '../../providers/ethereum';

type MetaMaskOnboardingState = {
  status: MetaMaskOnboardingStatus;
  accounts: string[];
};

type MetaMaskAdapter = {
  onboardingState: MetaMaskOnboardingState;
  connect: () => void;
};

export function useMetaMask(): MetaMaskAdapter {
  const metaMaskOnboarding = useRef<MetaMaskOnboarding>();

  const initialStatus = MetaMaskOnboarding.isMetaMaskInstalled()
    ? 'notConnected'
    : 'notInstalled';
  const [onboardingState, setOnboardingState] =
    useState<MetaMaskOnboardingState>({
      status: initialStatus,
      accounts: []
    });

  const handleAccountsChanded = useCallback((accounts: string[]) => {
    setOnboardingState({
      status: 'connected',
      accounts
    });
    metaMaskOnboarding.current?.stopOnboarding();
  }, []);

  useEffect(() => {
    metaMaskOnboarding.current = new MetaMaskOnboarding();
    ethereum.on('accountsChanged', handleAccountsChanded);
    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanded);
    };
  }, [handleAccountsChanded]);

  const connect = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setOnboardingState({
        status: 'connecting',
        accounts: []
      });
      ethereum
        .request({
          method: 'eth_requestAccounts'
        })
        .then(handleAccountsChanded);
    } else {
      setOnboardingState({
        status: 'onboarding',
        accounts: []
      });
      metaMaskOnboarding.current?.startOnboarding();
    }
  };

  return { onboardingState, connect };
}
