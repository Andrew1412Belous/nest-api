import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegramOptions } from './telegraf.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constatns';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: ITelegramOptions;

	constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
		this.bot = new Telegraf(options.token);
		this.options = options;
	}

	async sendMessage(message: string, chatId: string = this.options.chatId) {
		if (!this.options.token) {
			throw new Error('TELEGRAM_TOKEN not found');
		}

		await this.bot.telegram.sendMessage(chatId, message);
	}
}
