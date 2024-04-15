import { HttpException } from './Http_Exception';

export class PanelistDataNotFoundException extends HttpException {
  constructor(message: string = 'Panelist Data Not Exists.') {
    super(400, message);
  }
}