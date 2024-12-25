import { Controller, Get, Query } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}
 
    @Get()
    async getProfiles(@Query('gender') gender: 'M' | 'F' = 'F', @Query('offset') offset=0, @Query('limit') limit = 10) {
        return this.profilesService.getProfiles(gender, offset, limit);
    }
}
