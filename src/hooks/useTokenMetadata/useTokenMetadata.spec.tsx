import { render, screen, waitFor } from '@testing-library/react';
import { BigNumber, Contract } from 'ethers';
import React from 'react';
import { Web3Provider } from '../../providers';
import { useTokenMetadata } from './useTokenMetadata';
import '@testing-library/jest-dom/extend-expect';

const TOKEN_ADDRESS = '0x7638a39545da7f5e39c2c5802702497df18fd024';
const TOKEN_ID = BigNumber.from(0);

const METADATA = {
  name: 'Epic NFT',
  description: 'Really epic NFT collection',
  image: 'https://i.imgur.com/6PSn6iD.jpeg'
};

const DATA_URL = `data:application/json;base64,${btoa(
  JSON.stringify(METADATA)
)}`;

jest.mock('ethers', () => {
  return {
    ...jest.requireActual('ethers'),
    Contract: jest.fn().mockImplementation(() => {
      return {
        tokenURI() {
          return Promise.resolve('');
        }
      };
    })
  };
});

//@ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(METADATA)
  })
);

const TokenMetadata = () => {
  const { metadata, isLoading, error } = useTokenMetadata(
    TOKEN_ADDRESS,
    TOKEN_ID
  );

  return (
    <>
      <div data-testid='name'>{metadata?.name}</div>
      <div data-testid='description'>{metadata?.description}</div>
      <div data-testid='image'>{metadata?.image}</div>
      <div data-testid='loading'>{isLoading && <span>loading</span>}</div>
      <div data-testid='error'>{error}</div>
    </>
  );
};

const App = () => (
  <Web3Provider>
    <TokenMetadata />
  </Web3Provider>
);

const getElementsToTest = () => {
  return [
    screen.getByTestId('name'),
    screen.getByTestId('description'),
    screen.getByTestId('image'),
    screen.getByTestId('loading'),
    screen.getByTestId('error')
  ];
};

describe('useTokenMetadata', () => {
  it('returns no metadata when loading', async () => {
    render(<App />);
    const [name, description, image, loading, error] = getElementsToTest();
    await waitFor(() => {
      expect(loading).not.toBeEmptyDOMElement();
      expect(name).toBeEmptyDOMElement();
      expect(description).toBeEmptyDOMElement();
      expect(image).toBeEmptyDOMElement();
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('returns token metadata when loading is finished if tokenURI is HTTP URL', async () => {
    render(<App />);
    const [name, description, image, loading, error] = getElementsToTest();
    await waitFor(async () => {
      expect(loading).toBeEmptyDOMElement();
      expect(name).toHaveTextContent(METADATA.name);
      expect(description).toHaveTextContent(METADATA.description);
      expect(image).toHaveTextContent(METADATA.image);
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('returns token metadata when loading is finished if tokenURI is data url', async () => {
    //@ts-ignore
    Contract.mockImplementation(() => {
      return {
        tokenURI() {
          return Promise.resolve(DATA_URL);
        }
      };
    });
    render(<App />);
    const [name, description, image, loading, error] = getElementsToTest();
    await waitFor(async () => {
      expect(loading).toBeEmptyDOMElement();
      expect(name).toHaveTextContent(METADATA.name);
      expect(description).toHaveTextContent(METADATA.description);
      expect(image).toHaveTextContent(METADATA.image);
      expect(error).toBeEmptyDOMElement();
    });
  });

  it('returns an error and no metadata if the contract throws error', async () => {
    //@ts-ignore
    Contract.mockImplementation(() => {
      return {
        tokenURI() {
          throw new Error('unknown error');
        }
      };
    });
    render(<App />);
    const [name, description, image, loading, error] =
      await getElementsToTest();
    await waitFor(async () => {
      expect(loading).toBeEmptyDOMElement();
      expect(name).toBeEmptyDOMElement();
      expect(description).toBeEmptyDOMElement();
      expect(image).toBeEmptyDOMElement();
      expect(error).not.toBeEmptyDOMElement();
    });
  });

  it('returns an error and no metadata if uri fetch throws error', async () => {
    //@ts-ignore
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => {
          throw new Error('unknown error');
        }
      })
    );
    render(<App />);
    const [name, description, image, loading, error] =
      await getElementsToTest();
    await waitFor(async () => {
      expect(loading).toBeEmptyDOMElement();
      expect(name).toBeEmptyDOMElement();
      expect(description).toBeEmptyDOMElement();
      expect(image).toBeEmptyDOMElement();
      expect(error).not.toBeEmptyDOMElement();
    });
  });
});
