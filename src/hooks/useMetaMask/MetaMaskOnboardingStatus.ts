export type MetaMaskOnboardingStatusValue =
  | 'notInstalled'
  | 'notConnected'
  | 'onboarding'
  | 'connecting'
  | 'connected';

export type MetaMaskOnboardingStatus = {
  value: MetaMaskOnboardingStatusValue;
  isNotInstalled: boolean;
  isNotConnected: boolean;
  isOnboarding: boolean;
  isConnecting: boolean;
  isConnected: boolean;
};

export const MetaMaskOnboardingStatus = {
  from(value: MetaMaskOnboardingStatusValue): MetaMaskOnboardingStatus {
    return {
      value,
      isNotInstalled: value === 'notInstalled',
      isNotConnected: value === 'notConnected',
      isConnected: value === 'connected',
      isConnecting: value === 'connecting',
      isOnboarding: value === 'onboarding'
    };
  }
};
