import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useMetaMask } from './useMetaMask';
import MetaMaskOnboarding from '@metamask/onboarding';
const ETH_ADDRESS = '0x965B7A773e3632b259108d246A7Cfdcdff118999';

jest.mock('@metamask/onboarding');
jest.mock('../../providers/ethereum', () => {
  return {
    ethereum: {
      request() {
        return new Promise((resolve) =>
          setTimeout(() => resolve([ETH_ADDRESS]), 200)
        );
      },
      on() {},
      removeListener() {}
    }
  };
});

const MetaMaskButton = () => {
  const { accounts, status, connect } = useMetaMask();
  const list = accounts.map((account, index) => (
    <span key={index}>{account}</span>
  ));
  return (
    <div>
      <button onClick={connect}>{status.value}</button>
      {list}
    </div>
  );
};

describe('useMetaMask', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('has "notInstalled" state if MetaMask is not installed', () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(false);
    render(<MetaMaskButton />);
    expect(screen.getByRole('button')).toHaveTextContent('notInstalled');
  });

  it('has "notConnected" state if MetaMask is installed', () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    render(<MetaMaskButton />);
    expect(screen.getByRole('button')).toHaveTextContent('notConnected');
  });

  it('has "connecting" state when button clicked if MetaMask is installed', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    render(<MetaMaskButton />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('connecting');
    });
  });

  it('has "onboarding" state when button clicked if MetaMask is not installed', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(false);
    render(<MetaMaskButton />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('onboarding');
    });
  });

  it('has "connected" state and displays account address when MetaMask is connected', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    render(<MetaMaskButton />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('connected');
      expect(screen.getByText(ETH_ADDRESS)).toBeInTheDocument();
    });
  });
});
