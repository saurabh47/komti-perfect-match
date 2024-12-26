import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserAction } from 'src/entities/user-action.entity';
import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @Post()
  async createAction(
    @Body('sessionId') sessionId: number,
    @Body('userId') userId: number,
    @Body('action') action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ): Promise<UserAction> {
    return this.actionsService.createAction(sessionId, userId, action);
  }

  @Get(':sessionId/:action')
  async getActionsBySessionAndAction(
    @Param('sessionId') sessionId: number,
    @Param('action') action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ): Promise<UserAction[]> {
    return this.actionsService.getActionsBySessionAndAction(sessionId, action);
  }
}
