import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('USER_SESSIONS')
export class UserSession {
  @PrimaryGeneratedColumn({name: 'session_id'})
  sessionId: number;

  @Column({name: 'user_id'})
  userId: number;

  @Column({ name: 'selected_gender', type: 'varchar', length: 1 })
  selectedGender: string;

  @Column({ name: 'profile_filters', type: 'json'})
  profileFilters: any;

  @CreateDateColumn({ name: 'row_created_at' })
  rowCreatedAt: Date;

  @UpdateDateColumn({ name: 'row_updated_at' })
  rowUpdatedAt: Date;
}
