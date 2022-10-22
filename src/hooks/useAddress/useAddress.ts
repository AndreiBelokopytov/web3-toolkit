import { useWeb3 } from '../../providers/Web3Provider';

export const useAddress = () => {
  const { address } = useWeb3();
  return address;
};
