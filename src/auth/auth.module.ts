import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModel, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: UserModel.name,
				schema: UserSchema,
				collection: 'User',
			},
		]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		PassportModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
