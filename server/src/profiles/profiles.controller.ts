import { Controller, Get, Query } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}
 
    @Get()
    async getProfiles(@Query('sessionId') sessionId: string, @Query('gender') gender: 'M' | 'F' = 'F', @Query('offset') offset=0, @Query('limit') limit = 10) {
        return this.profilesService.getProfiles(sessionId, gender, offset, limit);
    }
}
