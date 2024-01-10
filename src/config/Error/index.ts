class ApiError extends Error {
  constructor(message: string, error: any) {
    super(`[${message}] - ${error}`);
    console.error(`[${message}] - ${error}`);
  }

  getError() {
    return {
      message: this.message,
    };
  }
}

export { ApiError };
