import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findOne(id: number){
      if(!id){
          return null;
      }
      return this.repo.findOne(id)
  }

  async find(email: string) {
    console.log(await this.repo.find({ email }));
    const user = await this.repo.find({ email });
    return user;
  }

  async create(body: UserDto) {
    const user = this.repo.create(body);
    //    console.log(user);
    const savedUser = await this.repo.save(user);
    //    console.log(savedUser);
    return savedUser;
  }

  async signupUser(email: string, password: string) {
    const createUser = this.repo.create({ email, password });

    const user = await this.repo.save(createUser);

    return user;
  }
}
