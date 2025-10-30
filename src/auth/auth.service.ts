import { Post, Body } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

async signup(dto: CreateUserDto) {
  const existing = await this.usersService.findByEmail(dto.email);
  if (existing) {
    throw new UnauthorizedException('User already exists');
  }

  const hash = await bcrypt.hash(dto.password, 10);

  const user = await this.usersService.create({
    email: dto.email,
    username: dto.username,
    passwordHash: hash,
  });

  console.log('User created:', user);

  return this.signPayload(user);
}

signPayload(user: any) {
  const payload = { sub: user._id.toString(), email: user.email };
  const accessToken = this.jwtService.sign(payload, {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    expiresIn: process.env.JWT_EXPIRATION || '3600s',
  });

  return {
    accessToken,
    user: {
      id: payload.sub,
      email: user.email,
      username: user.username,
    },
  };
}


  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.signPayload(user);
  }



}
