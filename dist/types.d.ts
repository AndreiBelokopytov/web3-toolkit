import React from "react";
import { BigNumber, BigNumberish, getDefaultProvider } from "ethers";
type Props = {
    children: string;
    substrLength?: number;
};
export const Address: React.MemoExoticComponent<({ children: address, substrLength }: Props) => JSX.Element>;
type _Props1 = {
    value: BigNumber;
    units?: BigNumberish;
    fractionDigits?: number;
};
export const Balance: React.MemoExoticComponent<({ value, units, fractionDigits }: _Props1) => JSX.Element>;
type BaseProvider = ReturnType<typeof getDefaultProvider>;
export type Web3Context = {
    address?: string;
    chainId?: string;
    chainDict: Record<string, string>;
    provider: BaseProvider;
    setAddress: (address: string | undefined) => void;
    setChainId: (chainID: string | undefined) => void;
};
export const Web3Context: React.Context<Web3Context>;
type _Props2 = Partial<Pick<Web3Context, 'address' | 'chainId' | 'provider' | 'chainDict'>> & {
    children: React.ReactNode;
};
export const Web3Provider: ({ children, address: initialAddress, chainId: initialChainId, provider, chainDict }: _Props2) => JSX.Element;
export const useWeb3: () => Web3Context;
export const useAddress: () => string | undefined;
type Chain = {
    id: string;
    name: string;
};
export const useChain: () => Chain | undefined;
export type OnBoardingStateStatus = 'notInstalled' | 'notConnected' | 'onboarding' | 'connecting' | 'connected';
type _OnboardingState1 = {
    status: OnBoardingStateStatus;
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
export const useProvider: () => ReturnType<typeof getDefaultProvider>;
type TokenBalanceState = {
    balance: BigNumber;
    isLoading: boolean;
    error?: string;
};
type TokenBalance = TokenBalanceState & {
    refresh: () => void;
};
export const useTokenBalance: (contractAddress: string, address: string) => TokenBalance;
type State = {
    balance: BigNumber;
    isLoading: boolean;
    error?: string;
};
export const useWalletBalance: (address: string) => State;

//# sourceMappingURL=types.d.ts.map
