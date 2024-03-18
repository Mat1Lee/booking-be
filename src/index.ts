import './moduleAlias';
import 'dotenv/config';
import './core/database/mongo';
import bodyParser from 'body-parser';
import express  from "express";
import cors from "cors";
import routes from './routes';
import './core/casbin';
import { ACCEPTED_LANGUAGES ,PORT} from './core/config';
import handleError from './utils/errorHandler.util';
import loggerHelper from './utils/logger.util';
import './core/casbin';
const logger = loggerHelper.getLogger('server');
const app = express();
app.use(cors());
app.use(bodyParser.json(
  {
    limit: '20mb',
  },
));

const parseLanguage = (req: express.Request, res: express.Response, next: express.NextFunction)=>{
  const language: string = req.acceptsLanguages()[0];
  req.language = ACCEPTED_LANGUAGES.includes(language) ? language : 'vi';
  next();
}
app.get('/', (req, res) => {
  res.send('External sever error!');
});
app.use(parseLanguage)

routes(app);

app.use(handleError);

app.listen(PORT, () => {
  logger.info(`App listening on port http://localhost:${PORT}`);
})