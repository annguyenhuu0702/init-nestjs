export type ApplicationErrorOptions = {
  code?: string;
  message: string;
};

export type ApplicationErrorName = 'user_input_error' | 'unauthorized_error' | 'forbidden' | 'not_found' | 'internal_server_error';

export class ApplicationError extends Error {
  public name: ApplicationErrorName;
  public code: string;
  public message: string;

  constructor(opt: ApplicationErrorOptions) {
    super(opt.message);
    this.code = opt.code;
    this.message = opt.message;
  }
}

export class UserInputError extends ApplicationError {
  constructor(opt: ApplicationErrorOptions) {
    super(opt);
    this.name = 'user_input_error';
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(opt: ApplicationErrorOptions) {
    super(opt);
    this.name = 'unauthorized_error';
  }
}

export class ForbiddenError extends ApplicationError {
  constructor(opt: ApplicationErrorOptions) {
    super(opt);
    this.name = 'forbidden';
  }
}

export class InternalServerError extends ApplicationError {
  constructor(opt: ApplicationErrorOptions) {
    super(opt);
    this.name = 'internal_server_error';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(opt: ApplicationErrorOptions) {
    super(opt);
    this.name = 'not_found';
  }
}
