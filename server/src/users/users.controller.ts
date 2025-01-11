import { Controller, Post, Get, Param, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSession } from 'src/entities/user-session.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/session')
  async createSession(@Body('selectedGender') selectedGender: string): Promise<UserSession> {
    return this.usersService.createSession(selectedGender);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/session/profile-filters')
  async updateProfileFilters(@Req() req: any, @Body('profileFilters') profileFilters: any): Promise<any> {
    return this.usersService.updateProfileFilters(req.user.sessionId, profileFilters);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/session')
  async getSessionDetails(@Req() req: any): Promise<UserSession> {
    return this.usersService.getSessionDetails(req.user.sessionId);
  }
}
