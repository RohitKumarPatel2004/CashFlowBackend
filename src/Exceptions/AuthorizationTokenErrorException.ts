import { HttpException } from './Http_Exception';

export class AuthorizationTokenErrorException extends HttpException {
  constructor(message: string = 'Authorization Token Error.') {
    super(400, message);
  }
}