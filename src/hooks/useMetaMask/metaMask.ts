import events from 'events';

export type MetaMask = Omit<events.EventEmitter, 'off'> & {
  request(options: { method: string }): Promise<any>;
};

export const metaMask: MetaMask= (window as any).ethereum;
