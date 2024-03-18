import emailService from "../email/email.service";

class EmailNotificationProvider {
  async send(data?: any): Promise<void> {
    const recipients = await this._resolveRecipients(data.recipients);
    const templateData = await this._resolveTemplateData(data.templateData);
    await emailService.sendNotificationEmail({
      template: data.templateKey,
      recipients,
      templateData,
    });
  }

  private async _resolveRecipients(recipients: any): Promise<string[]> {
    return typeof recipients === 'function' ? await recipients() : recipients;
  }

  private async _resolveTemplateData(templateData: any): Promise<any> {
    const resolvedTemplateData = typeof templateData === 'function' ? await templateData() : templateData;

    if (typeof resolvedTemplateData === 'object' && resolvedTemplateData.messageContent) {
      return resolvedTemplateData.messageContent;
    }

    return resolvedTemplateData;
  }
}

export { EmailNotificationProvider };