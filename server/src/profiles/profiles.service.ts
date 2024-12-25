import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ProfilesService {
    constructor(private dataSource: DataSource) {}

    async getProfiles(gender: 'M' | 'F' = 'F', offset=0, limit = 10) {
        return this.dataSource.query(`SELECT * FROM users WHERE is_deleted = false and gender = '${gender}' order by user_id desc LIMIT ${limit} OFFSET ${offset}`);
    }

}
