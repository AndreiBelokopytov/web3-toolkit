import React from 'react';
import { render, screen } from '@testing-library/react';
import { BigNumber } from 'ethers';
import { Balance } from './Balance';
import '@testing-library/jest-dom/extend-expect';

const BALANCE = BigNumber.from('111222333000000000000');

jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

describe('Balance', () => {
  it('renders formatted balance with default units', () => {
    render(<Balance value={BALANCE} />);
    expect(screen.queryByText('111.222333')).toBeInTheDocument();
  });

  it('renders formatted balance with specified units', () => {
    render(<Balance value={BALANCE} units={20} />);
    expect(screen.queryByText('1.11222333')).toBeInTheDocument();
  });

  it('renders formatted balance with specified units and fraction digits', () => {
    render(<Balance value={BALANCE} units={20} fractionDigits={4} />);
    expect(screen.queryByText('1.1122')).toBeInTheDocument();
  });

  it('throws an error if the value of the fraction digits is less than 0', () => {
    expect(() =>
      render(<Balance value={BALANCE} units={20} fractionDigits={-1} />)
    ).toThrow();
  });

  it('throws an error if the value of the fraction digits is greater than units', () => {
    expect(() =>
      render(<Balance value={BALANCE} fractionDigits={20} />)
    ).toThrow();
  });
});
