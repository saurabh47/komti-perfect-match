import { Controller, Post, Get, Param, Body, Query, UseGuards, Req, Put } from '@nestjs/common';
import { UserAction } from 'src/entities/user-action.entity';
import { ActionsService } from './actions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateResult } from 'typeorm';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAction(
    @Req() req,
    @Body('userId') userId: number,
    @Body('action') action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ): Promise<UserAction> {
    return this.actionsService.createAction(req.user.sessionId, userId, action);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateAction(
    @Req() req,
    @Body('userId') userId: number,
    @Body('action') action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ): Promise<UpdateResult> {
    return this.actionsService.updateAction(req.user.sessionId, userId, action);
  }  

  @UseGuards(JwtAuthGuard)
  @Get('/:action')
  async getActionsBySessionAndAction(
    @Req() req,
    @Param('action') action: 'LIKE' | 'DISLIKE' | 'SAVE',
    @Query('offset') offset=0, @Query('limit') limit = 10
  ): Promise<UserAction[]> {
    return this.actionsService.getProfiles(req.user.sessionId, action, offset, limit);
  }
}
