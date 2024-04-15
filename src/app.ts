import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import requestIp from 'request-ip';
import winston from 'winston';
import { logger } from './Config/Logger/Winston';
import { globalExceptionHander } from './Handlers/GlobalExceptionHandler';
import { env } from './Config/env';

const baseURl = ['http://localhost:3000'];
if (process.env.NODE_ENV !== 'production') {
  baseURl.push('http://localhost:3000');
}
if (process.env.NODE_ENV === 'production') {
  baseURl.push('http://localhost:3000');
}

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

import route from './routes/routes';
const app = express();

app.use(requestIp.mw());
app.use(express.static('public'));
app.use('/images', express.static('public/assets/images'));

app.use(
  cors({
    credentials: true,
    origin: baseURl,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', route);
app.use('/health', async (request: Request, response: Response) => {
  response.json({
    message: `Server up and Running ${env.NODE_ENV}`,
  });
});

app.use(globalExceptionHander);

export default app;