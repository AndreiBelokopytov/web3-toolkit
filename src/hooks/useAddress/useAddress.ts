import { useWeb3Context } from '../../context/web3Context';

export const useAddress = () => {
  const { address } = useWeb3Context();
  return address;
};
