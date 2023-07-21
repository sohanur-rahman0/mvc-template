import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/model/repository/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async test() {
        try {
            return await this.userRepository.getById(1);
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(body) {
        try {
            const checkUser = await this.userRepository.findOne({
                where: {
                    mobile: body.mobile,
                    status: 1
                }
            });

            if (checkUser) {
                throw new Error('User already exists');
            }

            const hashPassword = await bcrypt.hash(body.password, 10);

            const user = await this.userRepository.save({
                mobile: body.mobile,
                password: hashPassword,
                role: 'user',
                status: 1
            })
            if (user) {
                return user;
            }
            return false
        } catch (error) {
            throw error;
        }
    }

    async validateUser(mobile: string, password: string): Promise<any> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    mobile: mobile,
                    status: 1
                }
            });
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    return user;
                }
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}
