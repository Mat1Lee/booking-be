import telegram from "../telegram";

class TelegramNotificationProvider {
  async send(data?: any): Promise<void> {
    const messageContent = await this._resolveMessageContent(data.templateData);
    await telegram.sendNotificationsGroup(messageContent);
   
   
  }

  private async _resolveMessageContent(templateData: any): Promise<string> {
    const content = typeof templateData === 'function' ? await templateData() : templateData;
    return typeof content === 'object' && content.messageContent ? content.messageContent : content;
  }
}

export { TelegramNotificationProvider };