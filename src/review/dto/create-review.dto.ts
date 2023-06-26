import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5, { message: "Rating can't be higher than 1" })
	@Min(1, { message: "Rating can't be lower than 1" })
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}
