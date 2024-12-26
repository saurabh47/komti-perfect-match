import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSession } from 'src/entities/user-session.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sessions')
  async createSession(@Body('selectedGender') selectedGender: string): Promise<UserSession> {
    return this.usersService.createSession(selectedGender);
  }

  @Get('sessions/:sessionId')
  async getSessionDetails(@Param('sessionId') sessionId: number): Promise<UserSession> {
    return this.usersService.getSessionDetails(sessionId);
  }
}
