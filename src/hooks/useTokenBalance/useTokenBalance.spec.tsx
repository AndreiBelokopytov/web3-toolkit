import { useTokenBalance } from './useTokenBalance';
import { Contract } from 'ethers';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Web3Provider } from '../../providers';

const TOKEN_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
const OWNER_ADDRESS = '0x41653c7d61609D856f29355E404F310Ec4142Cfb';

jest.mock('ethers', () => {
  const ethers = jest.requireActual('ethers');
  return {
    ...ethers,
    Contract: jest.fn().mockImplementation(() => {
      return {
        balanceOf() {
          return Promise.resolve(ethers.BigNumber.from(100));
        },
        filters: {
          Transfer: jest.fn()
        }
      };
    })
  };
});

const TokenBalance = () => {
  const { balance, isLoading, error } = useTokenBalance(
    TOKEN_ADDRESS,
    OWNER_ADDRESS
  );

  return (
    <>
      <div data-testid='balance'>{balance?.toString()}</div>
      <div data-testid='loading'>{isLoading && <span>loading</span>}</div>
      <div data-testid='error'>{error}</div>
    </>
  );
};

const App = () => (
  <Web3Provider>
    <TokenBalance />
  </Web3Provider>
);

const getElementsToTest = () => {
  return [
    screen.getByTestId('balance'),
    screen.getByTestId('loading'),
    screen.getByTestId('error')
  ];
};

describe('useTokenBalance', () => {
  it('returns unefined balance initially', () => {
    render(<App />);
    const [balance, loading, error] = getElementsToTest();
    expect(balance).toBeEmptyDOMElement();
    expect(loading).not.toBeEmptyDOMElement();
    expect(error).toBeEmptyDOMElement();
  });

  it('returns positive balance when loading is finished', async () => {
    render(<App />);
    await waitFor(async () => {
      const [balance, loading, error] = getElementsToTest();
      expect(balance).toHaveTextContent(/^[1-9]\d*/);
      expect(loading).toBeEmptyDOMElement();
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('returns an error and zero balance if the "balanceOf" throws error', async () => {
    //@ts-ignore
    Contract.mockImplementation(() => {
      return {
        balanceOf() {
          throw new Error('unknown error');
        },
        filters: {
          Transfer: jest.fn()
        }
      };
    });
    render(<App />);
    await waitFor(async () => {
      const [balance, loading, error] = getElementsToTest();
      expect(balance).toBeEmptyDOMElement();
      expect(loading).toBeEmptyDOMElement();
      expect(error).not.toBeEmptyDOMElement();
    });
  });
});
