# web3-toolkit

> Web3 Toolkit for React

## Install

```bash
npm install --save git+https://github.com/AndreiBelokopytov/web3-toolkit.git#v0.1.x
```

## Usage

### Address

Displays a shorten Ethereum address

```tsx
<Address>{ETH_ADDRESS}</Address>
```

### useMetaMask

Provides a convenient way to access the MetaMask API

```tsx
const MetaMaskButton = () => {
  const { accounts, status, connect } = useMetaMask();
  return status.isConnected ?
    <Address>{accounts[0]}<Address> :
    <button onClick={connect}>Connect</button>
  );
};
```

### useTokenBalance

Gets the token balance for an ERC20 contract

```tsx
const TokenBalance = () => {
  const { balance, isLoading, errorMessage } = useTokenBalance(
    TOKEN_ADDRESS,
    WALLET_ADDRESS,
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
```

## License

MIT © [AndreiBelokopytov](https://github.com/AndreiBelokopytov)
