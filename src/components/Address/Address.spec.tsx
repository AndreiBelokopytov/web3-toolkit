import { Address } from './Address';
import { render, screen } from '@testing-library/react';
import React from 'react';

const ETH_ADDRESS = '0x965B7A773e3632b259108d246A7Cfdcdff118999';
const ETH_SHORT_ADDRESS = '0x965B...118999';

describe('Address', () => {
  it('renders address if no other props were passed', () => {
    render(<Address address={ETH_ADDRESS} />);
    expect(screen.getByText(ETH_ADDRESS)).toBeInTheDocument();
  });

  it('renders shortend address is such option is passed', () => {
    render(<Address address={ETH_ADDRESS} shortened />);
    expect(screen.getByText(/.+\.{3}.+/)).toBeInTheDocument();
  });

  it('skips shortening if address is too short', () => {
    render(<Address address={ETH_SHORT_ADDRESS} shortened />);
    expect(screen.getByText(ETH_SHORT_ADDRESS)).toBeInTheDocument();
  });
});