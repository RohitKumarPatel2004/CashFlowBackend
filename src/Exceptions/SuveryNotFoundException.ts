import { HttpException } from './Http_Exception';

export class SuveryNotFoundException extends HttpException {
  constructor(message: string = 'Survey Not Found.') {
    super(400, message);
  }
}