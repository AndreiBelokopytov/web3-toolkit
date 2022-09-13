/// <reference types="node" />
import events from 'events';
export declare type Ethereum = Omit<events.EventEmitter, 'off'> & {
    request(options: {
        method: string;
    }): Promise<any>;
};
export declare const ethereum: Ethereum;
