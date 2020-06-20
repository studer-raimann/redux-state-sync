// Type definitions for redux-state-sync 3.1
// Project: https://github.com/AOHUA/redux-state-sync#readme
// Definitions by: MU AOHUA <https://github.com/AOHUA>
//                 AntonioMendez <https://github.com/AntonioMendez>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// Source: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/redux-state-sync/index.d.ts

import { Store, Reducer, Middleware, Action } from "redux";

export interface Stamp {
    $uuid: string;
    $wuid: string;
    $isSync: boolean;
}
export type StampedAction = Stamp & Action;

export interface Config {
    channel?: string;
    predicate?: (action: Action) => boolean | null;
    blacklist?: Array<string>;
    whitelist?: Array<string>;
    prepareState?: <T, R>(state: T) => R;
}

export interface MessageListenerConfig {
    channel: BroadcastChannel;
    dispatch: (action: Action | StampedAction) => void;
    allowed: (action: Action) => boolean;
}

export function generateUuidForAction(action: Action): StampedAction;
export function isActionAllowed(config: Config): (type: string) => boolean;
export function createMessageListener(config: MessageListenerConfig): void;
export function createStateSyncMiddleware(config?: Config): Middleware;
export function withReduxStateSync<A extends Action, S>(
    appReducer: Reducer<S>,
    prepareInitialStateForStore?: (state: S) => unknown,
): (state: S, action: A) => Reducer<S, A>;
export function initStateWithPrevTab<S>(store: Store<S>): void;
export function initMessageListener<S>(store: Store<S>): void;
export function isActionSynced(action: Action): boolean;
