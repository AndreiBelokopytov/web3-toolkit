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

export const assert = (condition: any, msg?: string): asserts condition => {
  if (!condition) {
    throw new AssertionError(msg);
  }
};
