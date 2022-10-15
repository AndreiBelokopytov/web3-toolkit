import { useTokenBalance } from './useTokenBalance';
import { BigNumber, ethers } from 'ethers';
import React, { useCallback } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const TOKEN_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
const TOKEN_CREATOR = '0x41653c7d61609D856f29355E404F310Ec4142Cfb';

describe('useTokenBalance', () => {
  const provider = new ethers.providers.AlchemyProvider(
    'mainnet',
    ALCHEMY_API_KEY
  );

  const TokenBalance = () => {
    const { balance, isLoading, errorMessage } = useTokenBalance(
      TOKEN_ADDRESS,
      TOKEN_CREATOR,
      provider
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

        {isLoading && <p>loading</p>}
        {errorMessage && <p>{`{error: ${errorMessage}`}</p>}
      </>
    );
  };

  it('returns zero balance when loading', () => {
    render(<TokenBalance />);
    expect(screen.getByLabelText('Token balance')).toHaveDisplayValue(
      BigNumber.from(0).toString()
    );

    expect(screen.queryByText('loading')).toBeInTheDocument();
  });

  it('returns positive balance when loading is finished', async () => {
    render(<TokenBalance />);
    await waitFor(
      async () => {
        const tokenBalanceInput = await screen.getByLabelText('Token balance');
        expect(tokenBalanceInput).toHaveDisplayValue(/^[1-9]\d*/);
        const loadingText = await screen.queryByText('loading');
        expect(loadingText).not.toBeInTheDocument();
      },
      {
        timeout: 3000
      }
    );
  });
});
