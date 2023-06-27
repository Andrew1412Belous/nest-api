import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { index } from '@typegoose/typegoose';

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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Schema({ timestamps: true, sparse: true })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstCategory: TopLevelCategory;

	@Prop({ unique: true })
	alias: string;

	@Prop()
	secondCategory: string;

	@Prop()
	title: string;

	@Prop()
	metaTitle: string;

	@Prop()
	metaDescription: string;

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

const TopPageSchema = SchemaFactory.createForClass(TopPageModel);

TopPageSchema.index({
	'$**': 'text',
});

export { TopPageSchema };
