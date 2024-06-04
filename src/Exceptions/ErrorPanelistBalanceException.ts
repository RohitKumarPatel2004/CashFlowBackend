import { HttpException } from './Http_Exception';

export class ErrorPanelistBalanceException extends HttpException {
  constructor(message: string = 'No Point Balance Found.') {
    super(400, message);
  }
}