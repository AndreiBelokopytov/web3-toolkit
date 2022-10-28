import { providers } from 'ethers';
import { useWeb3 } from '../../providers/Web3Provider';

export const useNetwork = (): providers.Network | undefined => {
  const { chainId } = useWeb3();

  if (!chainId) {
    return undefined;
  }

  return providers.getNetwork(chainId);
};
