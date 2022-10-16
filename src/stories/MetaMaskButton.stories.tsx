import React, { useEffect } from 'react';
import { ComponentMeta } from '@storybook/react';
import { Address } from '../components';
import { useMetaMask } from '../hooks';

const MetaMaskButton = () => {
  const { accounts, chainId, isConnecting, isConnected, connect } =
    useMetaMask();
  const text = isConnecting ? 'Connecting...' : 'Connect';

  useEffect(() => {
    if (chainId && chainId !== '0x5') {
      alert('Switch to Goerli network');
    }
  }, [chainId]);

  return isConnected ? (
    <Address>{accounts[0]}</Address>
  ) : (
    <button onClick={connect}>{text}</button>
  );
};

export default {
  title: 'MetaMaskButton',
  component: MetaMaskButton
} as ComponentMeta<typeof MetaMaskButton>;

export const Primary = () => (
  <div className='preview'>
    <MetaMaskButton />
  </div>
);
Primary.storyName = 'MetaMaskButton';
