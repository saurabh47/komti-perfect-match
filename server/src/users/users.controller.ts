import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSession } from 'src/entities/user-session.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sessions')
  async createSession(@Body('selectedGender') selectedGender: string): Promise<UserSession> {
    return this.usersService.createSession(selectedGender);
  }

  @Patch('/sessions/:sessionId/profile-filters')
  async updateProfileFilters(@Param('sessionId') sessionId: number, @Body('profileFilters') profileFilters: any): Promise<any> {
    return this.usersService.updateProfileFilters(sessionId, profileFilters);
  }

  @Get('/sessions/:sessionId')
  async getSessionDetails(@Param('sessionId') sessionId: number): Promise<UserSession> {
    return this.usersService.getSessionDetails(sessionId);
  }
}
