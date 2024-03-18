import zalo from '@app/core/zalo';
class ZaloNotificationProvider {
  async send(
    data?: any
  ): Promise<any> {
    const recipients = await (typeof data.recipients === 'function' ? data.recipients() : data.recipients);
    let messageContent = await (typeof data.templateData === 'function' ? data.templateData() : data.templateData);

    if (typeof messageContent === 'object' && messageContent.messageContent) {
      messageContent = messageContent.messageContent;
    }

    await zalo.sendZaloMessage(messageContent, recipients);
  }
}

export {
  ZaloNotificationProvider
}