import events from 'events';

export type MetaMaskProvider = Omit<events.EventEmitter, 'off'> & {
  request(options: { method: string }): Promise<any>;
};

export const metaMaskProvider: MetaMaskProvider = (window as any).ethereum;
