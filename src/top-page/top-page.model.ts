import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPageModel>;

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

@Schema()
export class HhData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

@Schema()
export class TopPageAdvantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

@Schema()
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop()
	title: string;

	@Prop()
	category: string;

	@Prop(HhData)
	hh?: HhData;

	@Prop([TopPageAdvantage])
	advantages: TopPageAdvantage[];

	@Prop()
	seoText: string;

	@Prop()
	tagsTitle: string;

	@Prop([String])
	tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
