import React from "react";
import events from "events";
import { BigNumber, getDefaultProvider } from "ethers";
type Props = {
    children: string;
    substrLength?: number;
};
export const Address: React.MemoExoticComponent<({ children: address, substrLength }: Props) => JSX.Element>;
export type MetaMaskProvider = Omit<events.EventEmitter, 'off'> & {
    request(options: {
        method: string;
    }): Promise<any>;
};
export const metaMaskProvider: MetaMaskProvider;
export type OnBoardingStateStatus = 'notInstalled' | 'notConnected' | 'onboarding' | 'connecting' | 'connected';
type _OnboardingState1 = {
    status: OnBoardingStateStatus;
    accounts: string[];
    chainId?: string;
    error?: string;
};
type Result = _OnboardingState1 & {
    isNotInstalled: boolean;
    isNotConnected: boolean;
    isConnected: boolean;
    isConnecting: boolean;
    isOnboarding: boolean;
    connect: () => void;
};
export function useMetaMask(): Result;
type _OnBoardingStateStatus1 = 'notInstalled' | 'notConnected' | 'onboarding' | 'connecting' | 'connected';
export type OnboardingState = {
    status: _OnBoardingStateStatus1;
    accounts: string[];
};
export const OnboardingState: {
    notInstalled(): OnboardingState;
    notConnected(): OnboardingState;
    connected(accounts: string[]): OnboardingState;
    connecting(): OnboardingState;
    onboarding(): OnboardingState;
};
type TokenBalanceState = {
    balance: BigNumber;
    isLoading: boolean;
    errorMessage?: string;
};
type TokenBalance = TokenBalanceState & {
    refresh: () => void;
};
export const useTokenBalance: (contractAddress: string, address: string, provider: ReturnType<typeof getDefaultProvider>) => TokenBalance;

//# sourceMappingURL=types.d.ts.map
