import React from 'react';
import { render, screen } from '@testing-library/react';
import { BigNumber } from 'ethers';
import { Balance } from './Balance';
import '@testing-library/jest-dom/extend-expect';

const BALANCE = BigNumber.from('111222333000000000000');

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
});
