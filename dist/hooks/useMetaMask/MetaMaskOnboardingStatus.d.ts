export declare type MetaMaskOnboardingStatusValue = 'notInstalled' | 'notConnected' | 'onboarding' | 'connecting' | 'connected';
export declare type MetaMaskOnboardingStatus = {
    value: MetaMaskOnboardingStatusValue;
    isNotInstalled: boolean;
    isNotConnected: boolean;
    isOnboarding: boolean;
    isConnecting: boolean;
    isConnected: boolean;
};
export declare const MetaMaskOnboardingStatus: {
    from(value: MetaMaskOnboardingStatusValue): MetaMaskOnboardingStatus;
};
