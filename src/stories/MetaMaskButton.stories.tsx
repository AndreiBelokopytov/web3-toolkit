import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Address } from '../components';
import { useChain, useMetaMask } from '../hooks';
import { useAddress } from '../hooks/useAddress';
import { Web3Provider } from '../context/web3Context';

const MetaMaskButton = () => {
  const { status, connect } = useMetaMask();
  const address = useAddress();
  const chain = useChain();

  let text: string;
  switch (status) {
    case 'connecting':
      text = 'Connecting...';
      break;
    case 'onboarding':
      text = 'Onboarding...';
      break;
    case 'notInstalled':
      text = 'Install MetaMask';
      break;
    default:
      text = 'Connect';
  }

  return address ? (
    <div>
      <div>
        <strong>Address: </strong>
        <Address>{address}</Address>
      </div>
      <div>
        <strong>Chain: </strong> {chain?.name}
      </div>
    </div>
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
    <Web3Provider>
      <MetaMaskButton />
    </Web3Provider>
  </div>
);
Primary.storyName = 'MetaMaskButton';
