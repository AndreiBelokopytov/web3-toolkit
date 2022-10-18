import { useWeb3Context } from '../../context/web3Context';

type Chain = {
  id: string;
  name: string;
};

export const useChain = (): Chain | undefined => {
  const { chainId, chainDict } = useWeb3Context();

  if (!chainId) {
    return undefined;
  }

  const name = chainDict[chainId] ?? 'Unknown';

  return { id: chainId, name };
};
