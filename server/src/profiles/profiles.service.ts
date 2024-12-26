import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ProfilesService {
    constructor(private dataSource: DataSource) {}

    async getProfiles(sessionId: string, gender: 'M' | 'F' = 'F', offset=0, limit = 10) {
        return this.dataSource.query(
            `SELECT u.* FROM users u
            LEFT JOIN user_actions ua on ua.session_id = ${sessionId} and ua.user_id = u.user_id
            WHERE u.is_deleted = false and u.gender = '${gender}' and ua.user_id is null
            order by u.user_id desc LIMIT ${limit} OFFSET ${offset}`);
    }

}
