import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Auth } from 'typeorm';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
    private authService: AuthService){}

    @Post('signup')
    async signup(@Body() dto:CreateUserDto){
      return this.authService.signup(dto);

    } 

    @Post('login')
    async login(@Body() dto:LoginDto){
      return this.authService.login(dto);
    }
}
