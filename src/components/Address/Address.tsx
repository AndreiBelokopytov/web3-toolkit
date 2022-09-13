import React from 'react';

const DEFAULT_SUBSTRING_LENGTH = 6;

type Props = {
  children: string;
  substrLength?: number;
};

export const Address = React.memo(
  ({ children: address, substrLength }: Props) => {
    return <span>{shortenAddress(address, substrLength)}</span>;
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
