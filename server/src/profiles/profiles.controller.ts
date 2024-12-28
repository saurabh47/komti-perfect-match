import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}
 
    @Post()
    async getProfiles(@Query('sessionId') sessionId: string, 
        @Query('gender') gender: 'M' | 'F' = 'F', @Query('offset') offset=0, @Query('limit') limit = 10,
        @Body() filters) {
        return this.profilesService.getProfiles(sessionId, gender, offset, limit, filters);
    }

    @Get('/annual-incomes')
    async getAnnualIncome() {
        return this.profilesService.getAnnualIncomes();
    }

    @Get('/education-areas')
    async getEducationAreas() {
        return this.profilesService.getEducationAreas();
    }
}
