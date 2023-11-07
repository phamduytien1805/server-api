import { AppError } from '@lib/error-handling';
import * as os from 'os';
import { ErrorInstance } from './types';

class ValidationError extends AppError {
  errors: ErrorInstance[];

  constructor(errors: ErrorInstance[]) {
    super('ValidationError', '');
    this.errors = errors;
    this.errors.forEach((error) => {
      this.message += `${error.prop}: ${error.message}${os.EOL}`;
    });
    super.message = this.message;
  }
}

export default ValidationError;
