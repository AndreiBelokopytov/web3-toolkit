import { BigNumber, Contract, getDefaultProvider } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { getErrorMessage } from '../../utils';

const abi = ['function tokenURI(uint256 tokenId) view returns (string)'];

type TokenMetadata = {
  name: string;
  description: string;
  image?: string;
};

type TokenMetadataState<T extends TokenMetadata> = {
  metadata?: T;
  isLoading: boolean;
  error?: string;
};

const asDataUrl = (url: string): string | undefined => {
  const found = url.match(/^data:application\/json;base64,(.+)/);
  return found?.[1];
};

export const useTokenMetadata = <T extends TokenMetadata>(
  contractAddress: string,
  tokenId: BigNumber,
  provider?: ReturnType<typeof getDefaultProvider>
): TokenMetadataState<T> => {
  const contract = useMemo(() => {
    return new Contract(contractAddress, abi, provider);
  }, [contractAddress, provider]);

  const [state, setState] = useState<TokenMetadataState<T>>({
    isLoading: false
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      setState((prevState) => ({
        ...prevState,
        error: undefined,
        isLoading: true
      }));
      try {
        let metadata: T;
        const tokenUri: string = await contract.tokenURI(tokenId);
        const base64Data = asDataUrl(tokenUri);
        if (base64Data) {
          metadata = JSON.parse(atob(base64Data));
        } else {
          const response = await fetch(tokenUri);
          if (!response.ok) {
            throw new Error(
              `Network response was not OK, status: ${response.status}`
            );
          }
          metadata = await response.json();
        }
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          metadata
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          error: getErrorMessage(error),
          isLoading: false
        }));
      }
    };
    fetchMetadata();
  }, [contract, tokenId]);

  return state;
};
