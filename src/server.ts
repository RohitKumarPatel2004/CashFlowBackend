import App from './app';
import { logger } from './Config/Logger/Winston';
const port = process.env.port || 8000;

App.listen(port, () => {
  logger.info(`App is running on port ${port}`);
});