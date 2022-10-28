import { useWeb3 } from '../../providers';

export const useSigner = () => {
  const { signer } = useWeb3();
  return signer;
};
