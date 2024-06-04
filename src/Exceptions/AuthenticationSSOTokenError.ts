import { HttpException } from './Http_Exception';

export class AuthenticationSSOTokenErrorException extends HttpException {
  constructor(message: string = 'No Data Found.') {
    super(400, message);
  }
}