import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useMetaMask } from './useMetaMask';
import { isMetaMaskInstalled, metaMask } from '../../walletApi';
import '@testing-library/jest-dom/extend-expect';
import { useAddress } from '../useAddress';
import { useNetwork } from '../useNetwork';
import { Web3Provider } from '../../providers/Web3Provider';

const ETH_ADDRESS = '0x965B7A773e3632b259108d246A7Cfdcdff118999';
const CHAIN_ID = '0x1';

jest.mock('../../walletApi', () => {
  return {
    metaMask: {
      request: jest.fn(),
      on: jest.fn(),
      removeListener: jest.fn()
    },
    startOnboarding: jest.fn(),
    stopOnboarding: jest.fn(),
    isMetaMaskInstalled: jest.fn().mockImplementation(() => true)
  };
});

jest.mock('ethers', () => {
  return {
    ...jest.requireActual('ethers'),
    providers: {
      getNetwork: () => ({
        name: 'goerli',
        chainId: 1
      })
    }
  };
});

const MetaMaskButton = () => {
  const { status, error, connect, disconnect } = useMetaMask();
  const address = useAddress();
  const network = useNetwork();
  return (
    <div>
      <button data-testid='connect' onClick={connect}>
        Connect
      </button>
      <button data-testid='disconnect' onClick={disconnect}>
        Disconnect
      </button>
      <div data-testid='status'>{status}</div>
      <div data-testid='address'>{address}</div>
      <div data-testid='chainId'>{network?.chainId}</div>
      <div data-testid='error'>{error}</div>
    </div>
  );
};

const App = () => (
  <Web3Provider>
    <MetaMaskButton />
  </Web3Provider>
);

const getElementsToTest = () => {
  return {
    connectButton: screen.getByTestId('connect'),
    disconnectButton: screen.getByTestId('disconnect'),
    status: screen.getByTestId('status'),
    address: screen.getByTestId('address'),
    chainId: screen.getByTestId('chainId'),
    error: screen.getByTestId('error')
  };
};

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
    isMetaMaskInstalled.mockReturnValue(false);
    render(<App />);
    const { status, address, chainId, error } = getElementsToTest();
    expect(status).toHaveTextContent('notInstalled');
    expect(address).toBeEmptyDOMElement();
    expect(chainId).toBeEmptyDOMElement();
    expect(error).toBeEmptyDOMElement();
  });

  it('has "notConnected" state if empty account list given', async () => {
    //@ts-ignore
    isMetaMaskInstalled.mockReturnValue(true);
    //@ts-ignore
    metaMask.request.mockImplementation(() => {
      return new Promise((resolve) => setTimeout(() => resolve([]), 200));
    });
    render(<App />);
    const { connectButton, status, address, chainId, error } =
      getElementsToTest();
    fireEvent.click(connectButton);
    await waitFor(() => {
      expect(status).toHaveTextContent('notConnected');
      expect(address).toBeEmptyDOMElement();
      expect(chainId).toBeEmptyDOMElement();
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('has "notConnected" state if MetaMask is installed', () => {
    //@ts-ignore
    isMetaMaskInstalled.mockReturnValue(true);
    render(<App />);
    const { status, address, chainId, error } = getElementsToTest();
    expect(status).toHaveTextContent('notConnected');
    expect(address).toBeEmptyDOMElement();
    expect(chainId).toBeEmptyDOMElement();
    expect(error).toBeEmptyDOMElement();
  });

  it('has "connecting" state when button clicked if MetaMask is installed', async () => {
    //@ts-ignore
    isMetaMaskInstalled.mockReturnValue(true);
    render(<App />);
    const { connectButton, status, address, chainId, error } =
      getElementsToTest();
    fireEvent.click(connectButton);
    await waitFor(() => {
      expect(status).toHaveTextContent('connecting');
      expect(address).toBeEmptyDOMElement();
      expect(chainId).toBeEmptyDOMElement();
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('has "onboarding" state when button clicked if MetaMask is not installed', async () => {
    //@ts-ignore
    isMetaMaskInstalled.mockReturnValue(false);
    render(<App />);
    const { connectButton, status, address, chainId, error } =
      getElementsToTest();
    fireEvent.click(connectButton);
    await waitFor(() => {
      expect(status).toHaveTextContent('onboarding');
      expect(address).toBeEmptyDOMElement();
      expect(chainId).toBeEmptyDOMElement();
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('has "connected" state and sets address and chainId when MetaMask is connected', async () => {
    //@ts-ignore
    isMetaMaskInstalled.mockReturnValue(true);
    //@ts-ignore
    render(<App />);
    const { connectButton, status, address, chainId, error } =
      getElementsToTest();
    fireEvent.click(connectButton);
    await waitFor(() => {
      expect(status).toHaveTextContent('connected');
      expect(address).toHaveTextContent(ETH_ADDRESS);
      expect(chainId).toHaveTextContent(parseInt(CHAIN_ID, 16).toString());
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('has "notConnected" state and error message if "request" method throws an error', async () => {
    //@ts-ignore
    isMetaMaskInstalled.mockReturnValue(true);
    //@ts-ignore
    metaMask.request.mockImplementation(() => {
      throw new Error('Unknown error');
    });
    render(<App />);
    const { connectButton, status, chainId, address, error } =
      getElementsToTest();
    fireEvent.click(connectButton);
    await waitFor(async () => {
      expect(status).toHaveTextContent('notConnected');
      expect(address).toBeEmptyDOMElement();
      expect(chainId).toBeEmptyDOMElement();
      expect(error).not.toBeEmptyDOMElement();
    });
  });

  it('has "notConnected" state after disconnect', async () => {
    //@ts-ignore
    isMetaMaskInstalled.mockReturnValue(true);
    render(<App />);
    const { connectButton, disconnectButton, status, chainId, address, error } =
      getElementsToTest();
    fireEvent.click(connectButton);
    setTimeout(() => {
      fireEvent.click(disconnectButton);
    }, 1000);
    await waitFor(async () => {
      expect(status).toHaveTextContent('notConnected');
      expect(address).toBeEmptyDOMElement();
      expect(chainId).toBeEmptyDOMElement();
      expect(error).toBeEmptyDOMElement();
    });
  });
});
