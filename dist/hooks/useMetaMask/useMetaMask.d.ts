import { MetaMaskOnboardingStatus as OnboardingStatus } from './MetaMaskOnboardingStatus';
declare type MetaMaskOnboardingState = {
    status: OnboardingStatus;
    accounts: string[];
};
declare type MetaMaskAdapter = MetaMaskOnboardingState & {
    connect: () => void;
};
export declare function useMetaMask(): MetaMaskAdapter;
export {};
