import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { UserSession } from './user-session.entity';
  
  @Entity('USER_ACTIONS')
  export class UserAction {
    @PrimaryColumn({ name: 'session_id' })
    sessionId: number;
  
    @PrimaryColumn({ name: 'user_id' })
    userId: number;
  
    @PrimaryColumn({ name: 'action', type: 'enum', enum: ['LIKE', 'DISLIKE', 'SAVE'] })
    action: 'LIKE' | 'DISLIKE' | 'SAVE';
  
    @CreateDateColumn({ name: 'row_created_at' })
    rowCreatedAt: Date;
  
    @UpdateDateColumn({ name: 'row_updated_at' })
    rowUpdatedAt: Date;
  
    @ManyToOne(() => UserSession, (userSession) => userSession.sessionId, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'session_id' })
    userSession: UserSession;
  }
  