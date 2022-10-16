type OnBoardingStateStatus =
  | 'notInstalled'
  | 'notConnected'
  | 'onboarding'
  | 'connecting'
  | 'connected';

export type OnboardingState = {
  status: OnBoardingStateStatus;
  accounts: string[];
};

export const OnboardingState = {
  notInstalled(): OnboardingState {
    return {
      status: 'notInstalled',
      accounts: []
    };
  },
  notConnected(): OnboardingState {
    return {
      status: 'notConnected',
      accounts: []
    };
  },
  connected(accounts: string[]): OnboardingState {
    return {
      status: 'connected',
      accounts
    };
  },
  connecting(): OnboardingState {
    return {
      status: 'connecting',
      accounts: []
    };
  },
  onboarding(): OnboardingState {
    return {
      status: 'onboarding',
      accounts: []
    };
  }
};
