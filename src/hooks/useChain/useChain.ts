import { useWeb3 } from '../../providers/Web3Provider';

type Chain = {
  id: string;
  name: string;
};

export const useChain = (): Chain | undefined => {
  const { chainId, chainDict } = useWeb3();

  if (!chainId) {
    return undefined;
  }

  const name = chainDict[chainId] ?? 'Unknown';

  return { id: chainId, name };
};
