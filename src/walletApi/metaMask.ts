import MetaMaskOnboarding from '@metamask/onboarding';
import { MetaMask } from './metaMask.types';

const onboarding = new MetaMaskOnboarding();

export const metaMask: MetaMask | undefined = window.ethereum;

export const isMetaMaskInstalled = (
  metaMask: MetaMask | undefined
): metaMask is MetaMask => {
  return MetaMaskOnboarding.isMetaMaskInstalled();
};

export const startOnboarding = () => onboarding.startOnboarding();

export const stopOnboarding = () => onboarding.stopOnboarding();
