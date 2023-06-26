import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>) {}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);

		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt),
		});

		return newUser.save();
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec();
	}
}
