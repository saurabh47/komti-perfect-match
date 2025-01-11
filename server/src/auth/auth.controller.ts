import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);    
  }


  @Post('/anonymous-login')
  async anonymousLogin(@Body('selectedGender') selectedGender) {
    const userSession = await this.usersService.createSession(selectedGender);
    const anonymousUser = {user_id: -1, userSession};
    return this.authService.login(anonymousUser);    
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return this.usersService.findUser(req.user.userId);
  }
}
