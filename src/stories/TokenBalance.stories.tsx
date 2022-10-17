import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { ComponentMeta } from '@storybook/react';
import React from 'react';
import { useTokenBalance } from '../hooks';

const ERC20_TOKEN_ADDRESS = '0x51f44ca59b867E005e48FA573Cb8df83FC7f7597';
const OWNER_ADDRESS = '0x797D19711fB4a4363AFc6fdc5070097485708ee9';

const provider = new ethers.providers.AlchemyProvider(
  'goerli',
  process.env.ALCHEMY_API_KEY
);

type Props = {
  tokenAddress: string;
  ownerAddress: string;
};

const TokenBalance = ({ tokenAddress, ownerAddress }: Props) => {
  const { balance, isLoading } = useTokenBalance(
    tokenAddress,
    ownerAddress,
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

export const ERC20Story = () => (
  <div className='preview'>
    <TokenBalance
      tokenAddress={ERC20_TOKEN_ADDRESS}
      ownerAddress={OWNER_ADDRESS}
    />
  </div>
);
ERC20Story.storyName = 'ERC20 token balance';
