import { HttpException } from './Http_Exception';

export class UpdatingAttributeException extends HttpException {
  constructor(message: string = 'Error for Updating Attribute.') {
    super(400, message);
  }
}