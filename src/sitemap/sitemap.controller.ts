import { Controller, Get, Header } from '@nestjs/common';
import { TopPageService } from '../top-page/top-page.service';
import { ConfigService } from '@nestjs/config';
import { subDays, format } from 'date-fns';
import { Builder } from 'xml2js';
import { CATEGORY_URL } from './sitemap.constants';

@Controller('sitemap')
export class SitemapController {
	domain: string;

	constructor(
		private readonly topPageService: TopPageService,
		private readonly configService: ConfigService,
	) {
		this.domain = configService.get('DOMAIN') ?? '';
	}

	@Get('xml')
	@Header('content-type', 'text/xml')
	async siteMap() {
		const formatString = "yyyy-MM-dd'T'HH:mm:000xxx";
		let response = [
			{
				loc: `${this.domain}`,
				lastmod: format(subDays(new Date(), 1), formatString),
				changefreq: 'daily',
				prority: '1.0',
			},
			{
				loc: `${this.domain}/courses`,
				lastmod: format(subDays(new Date(), 1), formatString),
				changefreq: 'daily',
				prority: '1.0',
			},
		];

		const pages = await this.topPageService.findAll();

		response = response.concat(
			pages.map((page) => {
				return {
					loc: `${this.domain}${CATEGORY_URL[page.firstCategory]}/${page.alias}`,
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					lastmod: format(new Date(page.updatedAt ?? new Date()), formatString),
					changefreq: 'weekly',
					prority: '0.7',
				};
			}),
		);

		const builder = new Builder({
			xmldec: { version: '1.0', encoding: 'UTF-8' },
		});

		return builder.buildObject({
			urlset: {
				$: {
					xmlns: 'http://www.sitemaps.org/schemsa/sitemap/0.9',
				},
				url: response,
			},
		});
	}
}
