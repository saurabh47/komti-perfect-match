import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSession } from 'src/entities/user-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
  ) {}

  async createSession(selectedGender: string): Promise<UserSession> {
    const newSession = this.userSessionRepository.create({ selectedGender });
    return this.userSessionRepository.save(newSession);
  }

  async updateProfileFilters(sessionId: number,filters: any) {
    return this.userSessionRepository.update({sessionId}, {profileFilters: filters});
  }

  async getSessionDetails(sessionId: number): Promise<UserSession> {
    return this.userSessionRepository.findOneOrFail({ where: { sessionId } });
  }
}
