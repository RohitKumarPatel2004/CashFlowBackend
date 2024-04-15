import { HttpException } from './Http_Exception';

export class PanelistAlreadyExistException extends HttpException {
  constructor(message: string = 'Panelist Already Exists.') {
    super(400, message);
  }
}