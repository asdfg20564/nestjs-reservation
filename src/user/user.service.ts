import _ from 'lodash';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ){}


  async create(createUserDto: CreateUserDto) {
    const existUser = await this.findByEmail(createUserDto.email);
    if (!_.isNil(existUser)) {
      throw new ConflictException(
        `이미 가입된 ID입니다. ID: ${createUserDto.email}`,
      );
    }

    const newUser = await this.userRepository.save(createUserDto);

    return newUser.id;
  }

  async login(loginDto: LoginDto) {
    const {email, password} = loginDto;
    const user = await this.findByEmail(email);
    if (_.isNil(user)) {
      throw new NotFoundException(`유저를 찾을 수 없습니다.`);
    }

    if (user.password !== password) {
      throw new UnauthorizedException(
        `유저의 비밀번호가 올바르지 않습니다.`,
      );
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  checkUser(userPayload: any) {
    return `유저 정보: ${JSON.stringify(userPayload)}}`;
  }
  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email, deletedAt: null }});
  }
}
