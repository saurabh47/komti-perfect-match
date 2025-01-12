import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ProfilesService {
    constructor(private dataSource: DataSource) {}

    async getProfiles(sessionId: string, gender: 'M' | 'F', offset: number, limit: number, 
        filters: {
            age?: {lower: number, upper: number}, 
            height?: {lower:number, upper: number},
            incomeIds?: number,
            educationAreaIds?: number,
            numberOfBrothers?: number,
            numberOfSisters?: number
        }) {
             const optionalConditions = []; 
             const minAge = filters.age?.lower ?? 18;
             const maxAge = filters.age?.upper ?? 80;
             const minHeight = filters.height?.lower ?? 0;
             const maxHeight = filters.height?.upper ?? 213;
             const incomeIds = filters.incomeIds;
             const educationAreaIds = filters.educationAreaIds;
             const numberOfBrothers = filters.numberOfBrothers;
             const numberOfSisters = filters.numberOfSisters;

            if(incomeIds != null) {
                optionalConditions.push({'column': 'u.annual_income', 'value': `(${incomeIds})`, condition: 'in'});
            }
            if(educationAreaIds != null) {
                optionalConditions.push({'column': 'u.education_area', 'value': `(${educationAreaIds})`, condition: 'in'});
            }

            if(numberOfBrothers != null) {
                optionalConditions.push({'column': 'u.no_of_brothers', 'value': `(${numberOfBrothers})`, condition: 'in'});
            }
            if(numberOfSisters != null) {
                optionalConditions.push({'column': 'u.no_of_sisters', 'value': `(${numberOfSisters})`, condition: 'in'});
            }

            const optionalWhereClause = optionalConditions.reduce((acc,cur) => {
                return acc += ` and ${cur.column} ${cur.condition} ${cur.value}`;  
            }, "");

            const query = `SELECT u.*, ai.value as annual_income_value FROM users u
            INNER JOIN heights h on h.id = u.height
            INNER JOIN annual_incomes ai on ai.id = u.annual_income
            LEFT JOIN user_actions ua on ua.session_id = ${sessionId} and ua.user_id = u.user_id
            WHERE u.is_deleted = false and u.gender = '${gender}' and ua.user_id is null 
                and u.age between ${minAge} and ${maxAge}
                and h.height_cm between ${minHeight} and ${maxHeight}
                ${optionalWhereClause}
            order by u.user_id desc LIMIT ${limit} OFFSET ${offset}`;
            console.log(query)
        return this.dataSource.query(query);
    }

    async getLikedYouProfiles(userId: string, offset: number, limit: number) {
        return this.dataSource.query(`
            SELECT u.* FROM USER_ACTIONS ua 
            INNER JOIN USER_SESSIONS us ON us.session_id = ua.session_id
            INNER JOIN users u ON u.user_id = us.user_id
            WHERE ua.action = 'LIKE' AND ua.user_id = ${userId}
            ORDER BY ua.row_updated_at DESC LIMIT ${limit} OFFSET ${offset}
            `);
    }

    async getAnnualIncomes() {
        return this.dataSource.query(`SELECT * FROM annual_incomes`);
    }

    async getEducationAreas() {
        return this.dataSource.query(`SELECT * FROM education_areas`);
    }

}
