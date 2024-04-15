import { HttpException } from './Http_Exception';

export class ErrorWhileUpdatingPasswordException extends HttpException {
  constructor(message: string = 'Error while updating password.') {
    super(400, message);
  }
}
