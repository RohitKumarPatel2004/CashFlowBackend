import { HttpException } from './Http_Exception';

export class PanelistTransactionException extends HttpException {
  constructor(message: string = 'No Transaction Found') {
    super(400, message);
  }
}