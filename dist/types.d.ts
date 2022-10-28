import React from "react";
import { BigNumber, BigNumberish, getDefaultProvider, Signer, providers, Contract, ContractInterface } from "ethers";
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
export type BaseProvider = ReturnType<typeof getDefaultProvider>;
export type Web3Context = {
    address?: string;
    chainId?: string;
    chainDict: Record<string, string>;
    provider: BaseProvider;
    signer?: Signer;
    setAddress: (address: string | undefined) => void;
    setChainId: (chainID: string | undefined) => void;
};
export const Web3Context: React.Context<Web3Context>;
type _Props2 = Partial<Pick<Web3Context, 'address' | 'chainId' | 'provider' | 'chainDict' | 'signer'>> & {
    children: React.ReactNode;
};
export const Web3Provider: ({ children, address: initialAddress, chainId: initialChainId, provider, signer, chainDict }: _Props2) => JSX.Element;
export const useWeb3: () => Web3Context;
export const useAddress: () => string | undefined;
export const useNetwork: () => providers.Network | undefined;
export const useProvider: () => ReturnType<typeof getDefaultProvider>;
export const useSigner: () => import("ethers").Signer | undefined;
export const useContract: (address: string, abi: ContractInterface) => [contract: Contract, connect: () => void];
declare global {
    interface Window {
        ethereum: MetaMask;
    }
}
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
    disconnect: () => void;
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
type State = {
    balance?: BigNumber;
    isLoading: boolean;
    error?: string;
};
type Options = {
    refreshOnTransfer?: boolean;
};
type TokenBalance = State & {
    refresh: () => void;
};
export const useTokenBalance: (contractAddress: string, address: string, { refreshOnTransfer }?: Options | undefined) => TokenBalance;
type TokenMetadata = {
    name: string;
    description: string;
    image?: string;
};
type TokenMetadataState<T extends TokenMetadata> = {
    metadata?: T;
    isLoading: boolean;
    error?: string;
};
export const useTokenMetadata: <T extends TokenMetadata>(contractAddress: string, tokenId: BigNumber) => TokenMetadataState<T>;
type _State1 = {
    balance?: BigNumber;
    isLoading: boolean;
    error?: string;
};
type _Options1 = {
    refreshOnBlock?: boolean;
};
export const useWalletBalance: (address: string, { refreshOnBlock }?: _Options1 | undefined) => _State1;

//# sourceMappingURL=types.d.ts.map
