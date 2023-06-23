import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

@Schema()
class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

@Schema()
export class ProductModel {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice: number;

	@Prop()
	credit: number;

	@Prop()
	description: string;

	@Prop()
	calculatedRating: number;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop([String])
	categories: string[];

	@Prop([String])
	tags: string[];

	@Prop([ProductCharacteristic])
	characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
