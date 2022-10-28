import { Contract, ContractInterface } from 'ethers';
import { useCallback, useState } from 'react';
import { useProvider } from '../useProvider';
import { useSigner } from '../useSigner';

export const useContract = (
  address: string,
  abi: ContractInterface
): [contract: Contract, connect: () => void] => {
  const signer = useSigner();
  const provider = useProvider();
  const [contract, setContract] = useState(
    new Contract(address, abi, provider)
  );
  const connect = useCallback(() => {
    if (signer) {
      setContract(contract.connect(signer));
    }
  }, [contract, signer]);
  return [contract, connect];
};
