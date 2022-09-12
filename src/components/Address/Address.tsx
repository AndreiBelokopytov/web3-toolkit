import React, { useMemo } from 'react';

const DEFAULT_SUBSTRING_LENGTH = 6;

type Props = {
  address: string;
  shortened?: boolean;
  shortenedSubstrLength?: number;
};

export const Address = React.memo(
  ({ address, shortened, shortenedSubstrLength }: Props) => {
    const formattedAddress = useMemo(
      () =>
        shortened ? shortenAddress(address, shortenedSubstrLength) : address,
      [address, shortened, shortenedSubstrLength]
    );
    return <span>{formattedAddress}</span>;
  }
);

function shortenAddress(
  address: string,
  substrLength = DEFAULT_SUBSTRING_LENGTH
) {
  if (address.length <= substrLength * 2 || address.match(/.*\.{3}.*/)) {
    return address;
  }

  return `${address.slice(0, substrLength)}...${address.slice(
    address.length - substrLength,
    address.length
  )}`;
}
