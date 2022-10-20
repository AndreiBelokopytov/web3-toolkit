import { useWeb3Context } from '../../context';

export const useProvider = () => {
  const { provider } = useWeb3Context();
  return provider;
};
