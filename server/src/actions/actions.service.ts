import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAction } from 'src/entities/user-action.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(UserAction)
    private readonly userActionRepository: Repository<UserAction>,
  ) {}

  async createAction(
    sessionId: number,
    userId: number,
    action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ): Promise<UserAction> {
    const newAction = this.userActionRepository.create({ sessionId, userId, action });
    return this.userActionRepository.save(newAction);
  }

  async getActionsBySessionAndAction(
    sessionId: number,
    action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ): Promise<UserAction[]> {
    return this.userActionRepository.find({ where: { sessionId, action } });
  }
}
