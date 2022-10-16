import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useMetaMask } from './useMetaMask';
import MetaMaskOnboarding from '@metamask/onboarding';
import { metaMaskProvider } from '../../providers/metaMaskProvider';
import '@testing-library/jest-dom/extend-expect';

const ETH_ADDRESS = '0x965B7A773e3632b259108d246A7Cfdcdff118999';
const CHAIN_ID = 'goerli';

jest.mock('@metamask/onboarding');
jest.mock('../../providers/metaMaskProvider', () => {
  return {
    metaMaskProvider: {
      request: jest.fn(),
      on() {},
      removeListener() {}
    }
  };
});

const MetaMaskButton = () => {
  const { accounts, status, chainId, error, connect } = useMetaMask();
  const list = accounts.map((account, index) => (
    <span key={index}>{account}</span>
  ));
  return (
    <div>
      <button onClick={connect}>{status}</button>
      <div data-testid='chainId'>{chainId}</div>
      <div data-testid='error'>{error}</div>
      <div data-testid='accounts'>{list}</div>
    </div>
  );
};

describe('useMetaMask', () => {
  beforeEach(() => {
    jest.resetModules();
    // @ts-ignore
    metaMaskProvider.request.mockImplementation(
      ({ method: methodName }: { method: string }) => {
        switch (methodName) {
          case 'eth_requestAccounts':
            return new Promise((resolve) =>
              setTimeout(() => resolve([ETH_ADDRESS]), 200)
            );
          case 'eth_chainId':
            return Promise.resolve(CHAIN_ID);
          default:
            return Promise.reject();
        }
      }
    );
  });

  it('has "notInstalled" state if MetaMask is not installed', () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(false);
    render(<MetaMaskButton />);
    expect(screen.getByRole('button')).toHaveTextContent('notInstalled');
  });

  it('has "notConnected" state if empty account list given', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    //@ts-ignore
    metaMaskProvider.request.mockImplementation(() => {
      return new Promise((resolve) => setTimeout(() => resolve([]), 200));
    });
    render(<MetaMaskButton />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('notConnected');
    });
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

  it('has "connected" state and displays account address and chainId when MetaMask is connected', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    //@ts-ignore
    render(<MetaMaskButton />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('connected');
      expect(screen.getByText(ETH_ADDRESS)).toBeInTheDocument();
      expect(screen.getByTestId('chainId')).toHaveTextContent(CHAIN_ID);
    });
  });

  it('has "notConnected" state and error message if "request" method throws an error', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    //@ts-ignore
    metaMaskProvider.request.mockImplementation(() => {
      throw new Error('Unknown error');
    });
    render(<MetaMaskButton />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('notConnected');
      expect(screen.getByTestId('error')).not.toBeEmptyDOMElement();
    });
  });
});
