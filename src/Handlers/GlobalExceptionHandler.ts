import { NextFunction, Request, Response } from 'express';
import { logger } from '../Config/Logger/Winston';
import { env } from 'process';
import { HttpException } from '../Exceptions/Http_Exception';

export const globalExceptionHander = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof HttpException) {
    logger.error(error);
    const { status, message } = error;
    response.status(status).json({
      status,
      message,
    });
  } else {
    //log the error, notify admin:  Serious Issue
    logger.error(error);
    response.status(500).json({
      status: 500,
      message: 'An error occured, try again later!',
      error: env.isDevelopment ? error.message : undefined,
      stacktrace: env.isDevelopment ? error.stack : undefined,
    });
  }
};
