# web3-toolkit-react

> Web3 Toolkit for React

## Install

The library depends on the `ethers` package so install it first:

```
npm install --save ethers
```

Also make sure you use `react` >= `16.14.0`.

Finally install the library:

```
npm install --save web3-toolkit-react
```

## Quick start

1. Setup a `Web3Provider` to share session variables (address, network etc) across your app.

It is not required but strictly recommended to create an Ethereum provider and pass it to `Web3Provider`.

Don't get confused:

- `Web3Provider` provides React context
- Ethereum provider provides data from the Ethereum network, read more in `ethers` [library documentation](https://docs.ethers.io/v5/api/providers/)

```typescript
import { Web3Provider} from 'web3-toolkit-react';

...

const alchemyProvider = new ethers.providers.AlchemyProvider(
  NETWORK_NAME,
  ALCHEMY_API_KEY
);

<Web3Provider provider={alchemyProvider}>
    <App />
</Web3Provider>
```

2. Use components and hooks:

```typescript
import { Address, useMetaMask, useAddress, useChain } from 'web3-toolkit-react';

const App = () => {
  const { status, error, connect } = useMetaMask();
  const address = useAddress();
  const chain = useChain();

  return (
    <div>
      <button onClick={connect}>{status}</button>
      <Address>{address}</Address>
      <div>{chain?.name}</div>
    </div>
  );
};
```

## License

MIT © [AndreiBelokopytov](https://github.com/AndreiBelokopytov)
