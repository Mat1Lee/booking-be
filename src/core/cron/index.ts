import { CronJob } from 'cron';
import loggerHelper from '@utils/logger.util';
const logger = loggerHelper.getLogger('core.cron');
const nearDueProductWarningCron = new CronJob(
	'0 0 * * *',
	async function() {
		try{
		
		}catch(err){
		}
	},
	null,
	true,
	'Asia/Ho_Chi_Minh'
);