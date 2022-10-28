import { render, screen } from '@testing-library/react';
import React, { useEffect } from 'react';
import { Web3Provider } from '../../providers';
import { useContract } from './useContract';
import '@testing-library/jest-dom/extend-expect';

const CONTRACT_ADDRESS = '0x51f44ca59b867E005e48FA573Cb8df83FC7f7597';
const ABI = ['function balanceOf(address owner) view returns (uint256)'];

const Contract = () => {
  const [contract, connect] = useContract(CONTRACT_ADDRESS, ABI);

  useEffect(() => {
    connect();
  }, [connect]);

  return <div data-testid='address'>{contract.address}</div>;
};

const App = () => (
  <Web3Provider>
    <Contract />
  </Web3Provider>
);

const getElementsToTest = () => {
  return [screen.getByTestId('address')];
};

describe('useContract', () => {
  it('creates a contract', () => {
    render(<App />);
    const [address] = getElementsToTest();
    expect(address).toHaveTextContent(CONTRACT_ADDRESS);
  });
});
