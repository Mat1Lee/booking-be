import { MONGO_DB_NAME, MONGO_URL } from '../config';
import path from 'path';

import { newEnforcer, Model, Enforcer } from 'casbin';
import MongooseAdapter from 'casbin-mongoose-adapter';
import loggerHelper from '@utils/logger.util';

const logger = loggerHelper.getLogger('queue');

class Casbin {

  static instance: Casbin;
  adapter: any;
  enforcer: Enforcer = new Enforcer;

  constructor() {
    this.init().then(() => {
      logger.info('Initialized casbin');
    });
  }

  async init() {
    const model2 = path.resolve(__dirname, './model.conf');
    this.adapter = await MongooseAdapter.newAdapter(`${MONGO_URL}`);
    this.enforcer = await newEnforcer(model2, this.adapter);
    this.enforcer.initWithAdapter(model2, this.adapter);
    await this.enforcer.loadPolicy()
  }
  static getInstance() {
    if (!Casbin.instance) {
      Casbin.instance = new Casbin();
    }
    return Casbin.instance;
  }
}

export default Casbin.getInstance();
