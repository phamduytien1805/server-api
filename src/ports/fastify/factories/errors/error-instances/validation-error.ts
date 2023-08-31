import * as os from 'os';
import { ErrorInstance } from '../type';

class ValidationError extends Error {
  errors: ErrorInstance[];

  constructor(errors: ErrorInstance[]) {
    super('');
    this.name = 'ValidationError';
    this.errors = errors;
    this.message = '';
    this.errors.forEach((error) => {
      this.message += `${error.prop}: ${error.message}${os.EOL}`;
    });
    super.message = this.message;
  }
}

export default ValidationError;
