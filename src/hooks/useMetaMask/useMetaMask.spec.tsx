import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useMetaMask } from './useMetaMask';
import MetaMaskOnboarding from '@metamask/onboarding';
import { metaMask } from './metaMask';
import '@testing-library/jest-dom/extend-expect';
import { useAddress } from '../useAddress';
import { useChain } from '../useChain';
import { Web3Provider } from '../../providers/Web3Provider';

const ETH_ADDRESS = '0x965B7A773e3632b259108d246A7Cfdcdff118999';
const CHAIN_ID = 'goerli';

jest.mock('@metamask/onboarding');
jest.mock('./metaMask', () => {
  return {
    metaMask: {
      request: jest.fn(),
      on() {},
      removeListener() {}
    }
  };
});

const MetaMaskButton = () => {
  const { status, error, connect } = useMetaMask();
  const address = useAddress();
  const chain = useChain();
  return (
    <div>
      <button onClick={connect}>{status}</button>
      <div data-testid='address'>{address}</div>
      <div data-testid='chainId'>{chain?.id}</div>
      <div data-testid='error'>{error}</div>
    </div>
  );
};

const App = () => (
  <Web3Provider>
    <MetaMaskButton />
  </Web3Provider>
);

describe('useMetaMask', () => {
  beforeEach(() => {
    jest.resetModules();
    // @ts-ignore
    metaMask.request.mockImplementation(
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
    render(<App />);
    expect(screen.getByRole('button')).toHaveTextContent('notInstalled');
  });

  it('has "notConnected" state if empty account list given', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    //@ts-ignore
    metaMask.request.mockImplementation(() => {
      return new Promise((resolve) => setTimeout(() => resolve([]), 200));
    });
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('notConnected');
    });
  });

  it('has "notConnected" state if MetaMask is installed', () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    render(<App />);
    expect(screen.getByRole('button')).toHaveTextContent('notConnected');
  });

  it('has "connecting" state when button clicked if MetaMask is installed', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('connecting');
    });
  });

  it('has "onboarding" state when button clicked if MetaMask is not installed', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(false);
    render(<App />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('onboarding');
    });
  });

  it('has "connected" state and sets address and chainId when MetaMask is connected', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    //@ts-ignore
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('connected');
      expect(screen.getByTestId('address')).toHaveTextContent(ETH_ADDRESS);
      expect(screen.getByTestId('chainId')).toHaveTextContent(CHAIN_ID);
    });
  });

  it('has "notConnected" state and error message if "request" method throws an error', async () => {
    //@ts-ignore
    MetaMaskOnboarding.isMetaMaskInstalled.mockReturnValue(true);
    //@ts-ignore
    metaMask.request.mockImplementation(() => {
      throw new Error('Unknown error');
    });
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(async () => {
      const button = await screen.getByRole('button');
      expect(button).toHaveTextContent('notConnected');
      expect(screen.getByTestId('error')).not.toBeEmptyDOMElement();
    });
  });
});
