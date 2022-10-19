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
