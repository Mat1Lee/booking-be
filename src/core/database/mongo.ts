import mongoose from 'mongoose';
import loggerHelper from '@utils/logger.util';
import { MONGO_URL,MONGO_DB_NAME } from '../config';

const logger = loggerHelper.getLogger('mongo');
const connectWithRetry = (): void => {
  mongoose.connect(MONGO_URL, {
    autoCreate:false,
  }, (err) => {
    if (err) {
      logger.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
    logger.info('mongo connected');
  });
};


// var connection = mongoose.createConnection(MONGO_URL);
 
// autoIncrement.initialize(connection);

mongoose.set('strictQuery', false); // or true if you want to suppress the warning

connectWithRetry();
