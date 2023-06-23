import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ProductModel } from '../product/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema()
export class ReviewModel {
	@Prop()
	name: string;

	@Prop()
	title: string;

	@Prop()
	description: string;

	@Prop()
	rating: number;

	@Prop({ type: Types.ObjectId, ref: ProductModel.name })
	productId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
