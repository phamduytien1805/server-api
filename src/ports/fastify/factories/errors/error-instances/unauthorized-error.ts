import * as os from 'os';
import { ErrorInstance } from '../type';

class UnauthorizedError extends Error {
  errors: ErrorInstance[];

  constructor(errors: ErrorInstance[]) {
    super('');
    this.name = 'UnauthorizedError';
    this.errors = errors;
    this.message = '';
    this.errors.forEach((error) => {
      this.message += `${error.prop}: ${error.message}${os.EOL}`;
    });
    super.message = this.message;
  }
}

export default UnauthorizedError;
