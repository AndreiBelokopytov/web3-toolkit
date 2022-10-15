import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Address } from '../components';
import { useMetaMask } from '../hooks';

const MetaMaskButton = () => {
  const { accounts, status, connect } = useMetaMask();
  const text = status.isConnecting ? 'Connecting...' : 'Connect';
  return status.isConnected ? (
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
