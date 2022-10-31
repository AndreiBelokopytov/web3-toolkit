import React from 'react';
import { Web3Provider } from '../../providers';
import { useWalletBalance } from './useWalletBalance';
import { act, render, screen, waitFor } from '@testing-library/react';
import { BigNumber } from 'ethers';
import '@testing-library/jest-dom/extend-expect';
import { BaseProvider } from '../../types';

const ETH_ADDRESS = '0x965B7A773e3632b259108d246A7Cfdcdff118999';
const BALANCE = '1000000000000000000';

let provider: BaseProvider;

const WalletBalance = () => {
  const { balance, isLoading, error } = useWalletBalance(ETH_ADDRESS);
  return (
    <>
      <div data-testid='balance'>{balance?.toString()}</div>
      <div data-testid='loading'>{isLoading && <span>loading</span>}</div>
      <div data-testid='error'>{error}</div>
    </>
  );
};

const App = () => (
  <Web3Provider provider={provider}>
    <WalletBalance />
  </Web3Provider>
);

const getElementsToTest = () => {
  return [
    screen.getByTestId('balance'),
    screen.getByTestId('loading'),
    screen.getByTestId('error')
  ];
};

describe('useWalletBalance', () => {
  beforeEach(() => {
    //@ts-ignore
    provider = {
      getBalance: jest
        .fn()
        .mockImplementation(() => Promise.resolve(BigNumber.from(BALANCE))),
      on: jest.fn(),
      off: jest.fn()
    };
  });

  it('initially returns undefined balance', async () => {
    render(<App />);
    const [balance, loading, error] = getElementsToTest();
    await waitFor(() => {
      expect(balance).toBeEmptyDOMElement();
      expect(loading).not.toBeEmptyDOMElement();
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('returns balance when loading is finished', async () => {
    render(<App />);
    const [balance, loading, error] = getElementsToTest();
    await waitFor(() => {
      expect(balance).toHaveTextContent(BALANCE);
      expect(loading).toBeEmptyDOMElement();
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('returns an error if an error occurs', async () => {
    //@ts-ignore
    provider.getBalance.mockImplementation(() => {
      throw new Error('unknown error');
    });
    render(<App />);
    const [balance, loading, error] = getElementsToTest();
    await waitFor(() => {
      expect(balance).toBeEmptyDOMElement();
      expect(loading).toBeEmptyDOMElement();
      expect(error).not.toBeEmptyDOMElement();
    });
  });
});
