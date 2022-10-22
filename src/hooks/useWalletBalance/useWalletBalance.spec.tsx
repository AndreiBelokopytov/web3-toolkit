import React from 'react';
import { Web3Provider } from '../../providers';
import { useWalletBalance } from './useWalletBalance';
import { render, screen, waitFor } from '@testing-library/react';
import { BigNumber, getDefaultProvider } from 'ethers';
import '@testing-library/jest-dom/extend-expect';
import { BaseProvider } from '../../types';

const ETH_ADDRESS = '0x965B7A773e3632b259108d246A7Cfdcdff118999';
const BALANCE = '1000000000000000000';

jest.mock('ethers', () => {
  const ethers = jest.requireActual('ethers');
  return {
    ...ethers,
    getDefaultProvider: jest.fn().mockImplementation(() => {
      return {
        getBalance() {
          return Promise.resolve(ethers.BigNumber.from(BALANCE));
        }
      };
    })
  };
});

const WalletBalance = () => {
  const { balance, isLoading, error } = useWalletBalance(ETH_ADDRESS);
  return (
    <>
      <div data-testid='balance'>{balance.toString()}</div>
      <div data-testid='loading'>{isLoading && <span>loading</span>}</div>
      <div data-testid='error'>{error}</div>
    </>
  );
};

const App = (props: { provider?: BaseProvider }) => (
  <Web3Provider provider={props.provider}>
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
  it('returns zero balance when loading', () => {
    render(<App />);
    const [balance, loading, error] = getElementsToTest();
    expect(balance).toHaveTextContent(BigNumber.from(0).toString());
    expect(loading).not.toBeEmptyDOMElement();
    expect(error).toBeEmptyDOMElement();
  });

  it('returns balance when loading is finished', async () => {
    render(<App />);
    await waitFor(() => {
      const [balance, loading, error] = getElementsToTest();
      expect(balance).toHaveTextContent(BALANCE);
      expect(loading).toBeEmptyDOMElement();
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('returns an error and zero balance if an error occurs', async () => {
    //@ts-ignore
    getDefaultProvider.mockImplementation(() => {
      return {
        getBalance() {
          throw new Error('unknown error');
        }
      };
    });
    const provider = getDefaultProvider();
    render(<App provider={provider} />);
    await waitFor(() => {
      const [balance, loading, error] = getElementsToTest();
      expect(balance).toHaveTextContent(BigNumber.from(0).toString());
      expect(loading).toBeEmptyDOMElement();
      expect(error).not.toBeEmptyDOMElement();
    });
  });
});
