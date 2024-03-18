import loggerHelper from '@utils/logger.util';
import { ZaloNotificationProvider } from './ZaloNotificationProvider';
import { EmailNotificationProvider } from './EmailNotificationProvider';
import { TelegramNotificationProvider } from './TelegramNotificationProvider';
import { NAME_NOTIFICATION } from './constants';
const logger = loggerHelper.getLogger('NotificationsBot');

interface notificationBotServiceConfig {
  templateType?: string;
  data?: any;
  templateTitle?: string;
  isEmail?: boolean;
}

class notificationBotService implements notificationBotServiceConfig {
  templateType?: string;
  data?: any;
  templateTitle?: string;
  isEmail?: boolean;

  constructor(config: notificationBotServiceConfig = {}) {
    this.templateType = config.templateType || '';
    this.data = config.data || {};
    this.templateTitle = config.templateTitle || '';
    this.isEmail = config.isEmail || false;
  }
}



class sendNotifications extends notificationBotService {
  providerType?: string;
  templateKey?: string;
  templateData?: { [k: string]: any } | (() => { [k: string]: any }) | { messageContent: string } | (() => ({ messageContent: string })) | Promise<{ messageContent: string } | { [k: string]: any }>;
  recipients?: string[] | (() => string[] | Promise<string[]>) | Promise<string[]>;
  constructor(
    info: {
      providerType?: string,
      templateKey?: string,
      templateData?: { [k: string]: any } | (() => { [k: string]: any }) | { messageContent: string } | (() => ({ messageContent: string })) | Promise<{ messageContent: string } | { [k: string]: any }>,
      recipients?: string[] | (() => string[] | Promise<string[]>)
    } = {}
  ) {
    super();
    // Call the constructor of the parent class
    this.providerType = info.providerType || '';
    this.templateKey = info.templateKey || '';
    this.templateData = info.templateData || {};
    this.recipients = info.recipients || [];
  }

  async send() {
    try {
      let { providerType, recipients, templateData, templateKey } = this;
      if (typeof templateData === 'function') {
        templateData = await Promise.resolve(templateData());
      } else {
        templateData = await Promise.resolve(templateData);
      }
      switch (providerType) {
        case NAME_NOTIFICATION.ZALO:
          const zalo = new ZaloNotificationProvider();
          await zalo.send({ templateData, recipients });
          break;
        case NAME_NOTIFICATION.EMAIL:
          const email = new EmailNotificationProvider();
          await email.send({ recipients, templateKey, templateData });
          break;
        case NAME_NOTIFICATION.TELEGRAM:
          const telegram = new TelegramNotificationProvider();
          await telegram.send({ templateData });
          break;
        default:
          throw new Error(`Invalid provider type: ${providerType}`);
      }
      return Promise.resolve();
    } catch (err) {
      logger.error('sendNotifications', err);
    }
  }
}

export {
  notificationBotService,
  sendNotifications,
}