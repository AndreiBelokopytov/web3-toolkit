import type events from 'events';

export type MetaMask = Omit<events.EventEmitter, 'off'> & {
  request(options: { method: string }): Promise<any>;
};

declare global {
  interface Window {
    ethereum: MetaMask;
  }
}
