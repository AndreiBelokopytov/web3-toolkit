import { getDefaultProvider } from 'ethers';
import { useWeb3 } from '../../providers';

export const useProvider = (): ReturnType<typeof getDefaultProvider> => {
  const { provider } = useWeb3();
  return provider;
};
