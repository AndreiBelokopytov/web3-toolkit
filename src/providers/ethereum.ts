import events from 'events';

export type Ethereum = Omit<events.EventEmitter, 'off'> & {
  request(options: { method: string }): Promise<any>;
};

export const ethereum: Ethereum = (window as any).ethereum;
