import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAction } from 'src/entities/user-action.entity';
import { UserSession } from 'src/entities/user-session.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ActionsService {
  constructor(
    @InjectRepository(UserAction)
    private readonly userActionRepository: Repository<UserAction>,
    private dataSource: DataSource
  ) {}

  async createAction(
    sessionId: number,
    userId: number,
    action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ): Promise<UserAction> {
    const newAction = this.userActionRepository.create({ sessionId, userId, action });
    return this.userActionRepository.save(newAction);
  }

  async updateAction(
    sessionId: number,
    userId: number,
    action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ): Promise<UpdateResult> {
    return await this.userActionRepository.update({sessionId, userId}, {action});
  }



  async getActionsBySessionAndAction(
    sessionId: number,
    action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ): Promise<UserAction[]> {
    return this.userActionRepository.find({ where: { sessionId, action } , relations: ['session_id']});
  }

  async getProfiles(sessionId: number,
          action: 'LIKE' | 'DISLIKE' | 'SAVE', offset=0, limit = 10) {
      return this.dataSource.query(
          `SELECT u.* FROM users u
          INNER JOIN user_actions ua on ua.session_id = ${sessionId} and ua.user_id = u.user_id
          WHERE ua.action = '${action}'
          order by ua.row_updated_at desc LIMIT ${limit} OFFSET ${offset}`);
  }
}
