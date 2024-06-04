import { HttpException } from './Http_Exception';

export class PanelistNotExistException extends HttpException {
  constructor(message: string = 'Panelist Already Exists.') {
    super(400, message);
  }
}