import { HttpException } from './Http_Exception';

export class ErrorWhileRegisterPanelistException extends HttpException {
  constructor(message: string = 'Something Went Wrong!! Please try again.') {
    super(400, message);
  }
}