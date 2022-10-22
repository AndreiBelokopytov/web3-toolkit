import { getDefaultProvider } from 'ethers';

export type BaseProvider = ReturnType<typeof getDefaultProvider>;
