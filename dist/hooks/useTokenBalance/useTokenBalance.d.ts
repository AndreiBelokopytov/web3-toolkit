import { BigNumber, getDefaultProvider } from 'ethers';
declare type TokenBalanceState = {
    balance: BigNumber;
    isLoading: boolean;
    errorMessage?: string;
};
declare type TokenBalance = TokenBalanceState & {
    refresh: () => void;
};
export declare const useTokenBalance: (contractAddress: string, address: string, provider: ReturnType<typeof getDefaultProvider>) => TokenBalance;
export {};
