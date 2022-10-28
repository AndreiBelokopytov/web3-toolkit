import { BigNumber } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getErrorMessage } from '../../utils';
import { useContract } from '../useContract';

type State = {
  balance?: BigNumber;
  isLoading: boolean;
  error?: string;
};

type Options = {
  refreshOnTransfer?: boolean;
};

type TokenBalance = State & {
  refresh: () => void;
};

const abi = ['function balanceOf(address owner) view returns (uint256)'];

export const useTokenBalance = (
  contractAddress: string,
  address: string,
  { refreshOnTransfer }: Options | undefined = {}
): TokenBalance => {
  const [contract] = useContract(contractAddress, abi);
  const filterTransferTo = useMemo(
    () => contract.filters.Transfer(null, address),
    [contract, address]
  );
  const filterTransferFrom = useMemo(
    () => contract.filters.Transfer(address),
    [contract, address]
  );

  const [state, setState] = useState<State>({
    isLoading: true
  });

  const refresh = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: undefined
    }));
    try {
      const balance = await contract.balanceOf(address);
      setState((prevState) => ({
        ...prevState,
        balance,
        isLoading: false
      }));
    } catch (err) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: getErrorMessage(err)
      }));
    }
  }, [address, contract]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (refreshOnTransfer) {
      contract.on(filterTransferTo, refresh);
      contract.on(filterTransferFrom, refresh);
    }

    return () => {
      if (refreshOnTransfer) {
        contract.off(filterTransferTo, refresh);
        contract.off(filterTransferFrom, refresh);
      }
    };
  }, [
    contract,
    filterTransferTo,
    filterTransferFrom,
    refreshOnTransfer,
    refresh
  ]);

  return { ...state, refresh };
};
