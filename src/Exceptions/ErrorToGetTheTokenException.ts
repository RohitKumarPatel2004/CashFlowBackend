import { HttpException } from './Http_Exception';

export class ErrorToGetTheTokenException extends HttpException {
  constructor(message: string = 'Error To Get Token') {
    super(400, message);
  }
}