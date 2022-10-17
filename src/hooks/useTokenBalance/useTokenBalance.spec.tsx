import { useTokenBalance } from './useTokenBalance';
import { BigNumber, Contract } from 'ethers';
import React, { useCallback } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('ethers', () => {
  return {
    ...jest.requireActual('ethers'),
    Contract: jest.fn().mockImplementation(() => {
      return {
        balanceOf() {
          return Promise.resolve(100);
        }
      };
    })
  };
});

const TOKEN_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
const OWNER_ADDRESS = '0x41653c7d61609D856f29355E404F310Ec4142Cfb';

const TokenBalance = () => {
  const { balance, isLoading, error } = useTokenBalance(
    TOKEN_ADDRESS,
    OWNER_ADDRESS
  );

  const handleChange = useCallback(() => null, []);

  return (
    <>
      <label>
        Token balance
        <input
          type={'text'}
          value={balance.toString()}
          onChange={handleChange}
        />
      </label>
      <div data-testid='loading'>{isLoading && <span>loading</span>}</div>
      <div data-testid='error'>{error}</div>
    </>
  );
};

describe('useTokenBalance', () => {
  it('returns zero balance when loading', () => {
    render(<TokenBalance />);
    expect(screen.getByLabelText('Token balance')).toHaveDisplayValue(
      BigNumber.from(0).toString()
    );
    expect(screen.getByTestId('loading')).not.toBeEmptyDOMElement();
  });

  it('returns positive balance when loading is finished', async () => {
    render(<TokenBalance />);
    await waitFor(async () => {
      const tokenBalanceInput = await screen.getByLabelText('Token balance');
      expect(tokenBalanceInput).toHaveDisplayValue(/^[1-9]\d*/);
      const loading = await screen.getByTestId('loading');
      expect(loading).toBeEmptyDOMElement();
    });
  });

  it('returns an error and zero balance if the "balanceOf" throws error', async () => {
    //@ts-ignore
    Contract.mockImplementation(() => {
      return {
        balanceOf() {
          throw new Error('unknown error');
        }
      };
    });
    render(<TokenBalance />);
    await waitFor(async () => {
      const tokenBalanceInput = await screen.getByLabelText('Token balance');
      expect(tokenBalanceInput).toHaveDisplayValue(
        BigNumber.from(0).toString()
      );
      const loading = await screen.getByTestId('loading');
      expect(loading).toBeEmptyDOMElement();
      const error = await screen.getByTestId('error');
      expect(error).not.toBeEmptyDOMElement();
    });
  });
});
