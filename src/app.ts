import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import requestIp from 'request-ip';
import winston from 'winston';
import { logger } from './Config/Logger/Winston';
import { globalExceptionHander } from './Handlers/GlobalExceptionHandler';
import { env } from './Config/env';
import cron from 'node-cron';

let baseURl = ["http://localhost:5173"];
if (process.env.NODE_ENV !== 'production') {
  baseURl.push('http://localhost:5173');
}
if (process.env.NODE_ENV === 'production') {
  baseURl.push('http://localhost:5173');
}

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

import route from './routes/routes';
import { InvestmentDetailService } from './Services/InvestmentDetailService/InvestmentDetailService';
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

cron.schedule('*/1 * * * *', async () => {
  await InvestmentDetailService.decrementDays();
  console.log('Decrement days task executed');
});

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