import { Address } from './address';
import { render, screen } from '@testing-library/react';
import React from 'react';

const ETH_ADDRESS = '0x965B7A773e3632b259108d246A7Cfdcdff118999';
const ETH_SHORT_ADDRESS = '0x965B...118999';

describe('Address', () => {
  it('renders shorten address', () => {
    render(<Address>{ETH_ADDRESS}</Address>);
    expect(screen.getByText(/.+\.{3}.+/)).toBeInTheDocument();
  });

  it('skips shortening if address is too short', () => {
    render(<Address>{ETH_SHORT_ADDRESS}</Address>);
    expect(screen.getByText(ETH_SHORT_ADDRESS)).toBeInTheDocument();
  });
});
