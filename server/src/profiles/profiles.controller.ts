import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}
 
    @UseGuards(JwtAuthGuard)
    @Post()
    async getProfiles(@Req() req, @Query('gender') gender: 'M' | 'F' = 'F', @Query('offset') offset=0, @Query('limit') limit = 10,
        @Body() filters) {
        const user = req.user;
        console.log(user);
        return this.profilesService.getProfiles(user.sessionId, user.lookingFor, offset, limit, filters);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/liked-you')
    async getLikedYouProfiles(@Req() req, @Query('offset') offset=0, @Query('limit') limit = 10) {
        const user = req.user;
        return this.profilesService.getLikedYouProfiles(user.userId, offset, limit);
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
