import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcryptjs';
import { CurrentUser } from 'decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

@UseGuards(JwtAuthGuard)
@Get('me')
async me(@CurrentUser('userId') userId: string) {
  console.log('UserId from token:', userId);

  return this.usersService.findById(userId);
}



  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@CurrentUser() userId:string, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@CurrentUser() userId:string, @Body() dto: ChangePasswordDto) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.passwordHash) return { error: 'No password set' };
    const ok = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!ok) return { error: 'Current password invalid' };
    return this.usersService.changePassword(userId, dto.newPassword);
  }
}
