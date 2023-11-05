import * as os from 'os';
import { AppError } from '@lib/error-handling';
import { ErrorInstance } from './types';

class UnauthorizedError extends AppError {
  errors: ErrorInstance[];

  constructor(errors: ErrorInstance[]) {
    super('UnauthorizedError', '');
    this.errors = errors;
    this.message = '';
    this.errors.forEach((error) => {
      this.message += `${error.prop}: ${error.message}${os.EOL}`;
    });
    super.message = this.message;
  }
}

export default UnauthorizedError;
