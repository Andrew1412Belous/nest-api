import { ITelegramOptions } from '../telegram/telegraf.interface';
import { ConfigService } from '@nestjs/config';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
	return {
		token: configService.get('TELEGRAM_TOKEN'),
		chatId: configService.get('CHAT_ID') ?? '',
	};
};
