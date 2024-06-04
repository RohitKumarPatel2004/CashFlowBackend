import { HttpException } from './Http_Exception';

export class LoopClaimedSurveysException extends HttpException {
  constructor(message: string = 'Encountered an error!') {
    super(400, message);
  }
}