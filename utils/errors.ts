export class HttpError extends Error {
  private httpErrorCode = 200
  private httpErrorMessage = ""
  constructor(httpErrorCode: number, httpErrorMessage: string) {
    const message = `Got status code ${httpErrorCode}: ${httpErrorMessage}`
    super(message)
    this.httpErrorCode = httpErrorCode
    this.httpErrorMessage = httpErrorMessage
  }
}

export class ParameterError extends Error {
  constructor(parameterName: string, errorMessage = "") {
    const message = errorMessage
      ? `Invalid parameter ${parameterName}: ${errorMessage}`
      : `Invalid or missing parameter ${parameterName}`
    super(message)
  }
}
