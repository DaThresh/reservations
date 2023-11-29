export class ApiError extends Error {
  public httpStatus: number;

  constructor(message: string, httpStatus: number) {
    super(message);
    this.httpStatus = httpStatus;
    return this;
  }
}
