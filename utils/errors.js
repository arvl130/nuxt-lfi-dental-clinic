export class HttpError extends Error {
  constructor(httpErrorCode, httpErrorMessage) {
    const message = `Got status code ${httpErrorCode}: ${httpErrorMessage}`
    super(message)
    this.httpErrorCode = httpErrorCode
    this.httpErrorMessage = httpErrorMessage
  }
}

export class ParameterError extends Error {
  constructor(parameterName, errorMessage = "") {
    const message = errorMessage
      ? `Invalid parameter ${parameterName}: ${errorMessage}`
      : `Invalid or missing parameter ${parameterName}`
    super(message)
  }
}
