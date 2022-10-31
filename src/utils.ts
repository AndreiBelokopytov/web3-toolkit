import React, { useCallback, useEffect, useRef, useState } from 'react';

export const getErrorMessage = (error: unknown): string => {
  let errorMessage = 'Unknown error';
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  if (typeof error === 'string') {
    errorMessage = error;
  }
  return errorMessage;
};

export class AssertionError extends Error {}

export function assert(
  condition: boolean,
  msg?: string
): asserts condition is true {
  if (!condition) {
    throw new AssertionError(msg);
  }
}

export const useSafeState = <State>(
  initialState: State
): [state: State, setState: (value: React.SetStateAction<State>) => void] => {
  const isMounted = useRef(true);
  const [state, setState] = useState(initialState);

  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  const safeSetState = useCallback(
    (value: React.SetStateAction<State>) => {
      if (!isMounted.current) {
        return;
      }
      setState(value);
    },
    [setState]
  );

  return [state, safeSetState];
};
