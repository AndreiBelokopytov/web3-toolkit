import React from "react";
import { getDefaultProvider, BigNumber } from "ethers";
import events from "events";
type Props = {
    children: string;
    substrLength?: number;
};
export const Address: React.MemoExoticComponent<({ children: address, substrLength }: Props) => JSX.Element>;
type BaseProvider = ReturnType<typeof getDefaultProvider>;
export type Web3Context = {
    address?: string;
    chainId?: string;
    chainDict: Record<string, string>;
    provider?: BaseProvider;
    setAddress: (address: string | undefined) => void;
    setChainId: (chainID: string | undefined) => void;
};
export const Web3Context: React.Context<Web3Context>;
type _Props1 = Pick<Web3Context, 'address' | 'chainId' | 'provider'> & {
    chainDict?: Record<string, string>;
    children: React.ReactNode;
};
export const Web3Provider: ({ children, address: initialAddress, chainId: initialChainId, provider, chainDict }: _Props1) => JSX.Element;
export const useWeb3Context: () => Web3Context;
export const useAddress: () => string | undefined;
type Chain = {
    id: string;
    name: string;
};
export const useChain: () => Chain | undefined;
export type MetaMaskProvider = Omit<events.EventEmitter, 'off'> & {
    request(options: {
        method: string;
    }): Promise<any>;
};
export const metaMaskProvider: MetaMaskProvider;
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
export const useProvider: () => import("@ethersproject/providers").BaseProvider | undefined;
type TokenBalanceState = {
    balance: BigNumber;
    isLoading: boolean;
    error?: string;
};
type TokenBalance = TokenBalanceState & {
    refresh: () => void;
};
export const useTokenBalance: (contractAddress: string, address: string) => TokenBalance;

//# sourceMappingURL=types.d.ts.map
