import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSession } from 'src/entities/user-session.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
  ) {}

  async findUser(userId) {
    return (await this.dataSource.query(`SELECT * FROM USERS where user_id = ${userId}`))[0];
  }

  async createUser(details) {
    const query = this.generateInsertQuery(details);
    console.log(query);
    const dbReq = await this.dataSource.query(query, Object.values(details));
    if(dbReq && dbReq.affectedRows == 1) {
      return details;
    } else {
      return null;
    }
  }

  private generateInsertQuery(data: Record<string, any>): string {
    // Get column names and placeholders
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
  
    // Generate the ON DUPLICATE KEY UPDATE part
    const updatePart = Object.keys(data)
      .map((key) => `${key}=VALUES(${key})`)
      .join(', ');
  
    // Construct the SQL query
    const sql = `INSERT INTO users (${columns}) VALUES (${placeholders}) ON DUPLICATE KEY UPDATE ${updatePart}`;
  
    return sql.trim();
  }


  async getUserSession(userId: number) {
    return this.userSessionRepository.findOne({where: { userId }, order: {rowCreatedAt: 'DESC'}});
  }

  async createSession(selectedGender: string, userId?: number): Promise<UserSession> {
    const newSession = this.userSessionRepository.create({ selectedGender , userId});
    return this.userSessionRepository.save(newSession);
  }

  async updateProfileFilters(sessionId: number,filters: any) {
    return this.userSessionRepository.update({sessionId}, {profileFilters: filters});
  }

  async getSessionDetails(sessionId: number): Promise<UserSession> {
    return this.userSessionRepository.findOneOrFail({ where: { sessionId } });
  }
}
