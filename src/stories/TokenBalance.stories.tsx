import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { useTokenBalance } from '../hooks';

const TOKEN_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
const TOKEN_CREATOR = '0x41653c7d61609D856f29355E404F310Ec4142Cfb';

const provider = new ethers.providers.AlchemyProvider(
  'mainnet',
  process.env.ALCHEMY_API_KEY
);

const TokenBalance = () => {
  const { balance, isLoading } = useTokenBalance(
    TOKEN_ADDRESS,
    TOKEN_CREATOR,
    provider
  );

  return (
    <>
      <div>
        <div>Token balance</div>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <span>{formatEther(balance)}</span>
        )}
      </div>
    </>
  );
};

export default {
  title: 'TokenBalance',
  component: TokenBalance
} as ComponentMeta<typeof TokenBalance>;

export const Primary = () => (
  <div className='preview'>
    <TokenBalance />
  </div>
);
Primary.storyName = 'TokenBalance';
