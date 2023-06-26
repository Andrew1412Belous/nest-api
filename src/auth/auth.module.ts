import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModel, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: UserModel.name,
				schema: UserSchema,
				collection: 'User',
			},
		]),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
