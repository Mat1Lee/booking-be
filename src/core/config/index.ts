export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/';
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'worldpharmavn';
export const PORT = process.env.PORT || 3500;
export const ACCEPTED_LANGUAGES = ['en', 'vi'];


export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY || 'AKIAWR55JTJT7BP6LNV7';
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY || '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';
export const S3_API_VERSION = process.env.S3_API_VERSION || '2006-03-01';
export const S3_REGION = process.env.S3_REGION || 'ap-southeast-1';
export const S3_BUCKET = process.env.S3_BUCKET || 'worldcare-test';

export const ZALO_ACCOUNTS = process.env.ZALO_ACCOUNTS || '1242567605949002428';
export const ZALO_API = 'https://openapi.zalo.me';
export const ZALO_OA_TOKEN = process.env.ZALO_OA_TOKEN;

export const SUPPORTED_CITIES = process.env.SUPPORTED_CITIES ? String(process.env.SUPPORTED_CITIES).split(',') : ['48'];


export const SMTP_SERVER = process.env.SMTP_SERVER || 'smtp.gmail.com';
export const SMTP_PORT = process.env.SMTP_PORT || '587';
export const SMTP_USER = process.env.SMTP_USER || 'huyhoangtoeic2@gmail.com';
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD || 'dmhyixlkucnszaen';
export const EMAIL_SEND_FROM = process.env.EMAIL_SEND_FROM || 'support@worldcare.vn';

export const AWS_SES_REGION = process.env.AWS_SES_REGION || '';
export const SMTP_AWS_ACCESS_KEYPASSWORD = process.env.SMTP_AWS_ACCESS_KEYPASSWORD || '';
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || '';

export const RABBITMQ_URL = process.env.RABBITMQ_URL ||'amqp://localhost'

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '6814709236:AAFgdCeJ1lrr5hb8KMJoSYyR9Ed1a544BMg';
export const TELEGRAM_API_BASE_URL = process.env.TELEGRAM_API_BASE_URL || 'https://api.telegram.org'
export const TELEGRAM_GROUP_CHAT_ID = process.env.TELEGRAM_GROUP_CHAT_ID || '-4141826152'

export const DASHBOARD_URL = process.env.DASHBOARD_URL || 'https://dashboard.worldPharma.com'
export const FIREBASE_FCM_SERVER_KEY = process.env.FIREBASE_FCM_SERVER_KEY || 'AAAAsb9383I:APA91bEwEMClwQ-UkDtFrmQEmVTiZpwDl_QLH-0Ycvf0I6APbd1LFL1W-kdMNflHP_vdCMBg4X9T6GB7rEBb2wI9_ObE0Um69NeYbXsRmJ1iFdgPx-OWw3CK5LvNc-HN-m6SWldC7c4U'
