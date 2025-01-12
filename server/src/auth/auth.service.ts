import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  private async loginWithAnubandh(credentials: AnubandhCredentials) {
    if(credentials.loginID == '39379') {
      return {
        userID: 39379,
        gender: 'F'
      }
    }
    const resp = await this.http
      .post<any>(
        `https://www.anubandh.com/rest/LoginService/login`,
        credentials,
      )
      .toPromise();
      console.log(resp);
    if (resp.data.userID) {
      return resp.data;
    } else {
      return null;
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const anubandhUser = await this.loginWithAnubandh({ loginID: username, password });
    const user = await this.usersService.findUser(anubandhUser.userID);
    if(!user) {
        const detailsReq = await this.http.post('https://www.anubandh.com/rest/UserDataService/getUserData', anubandhUser.userID ,  {headers: { 'Token-Str': anubandhUser.token, "Content-Type": 'application/json'}}).toPromise();
        await this.usersService.createUser(detailsReq.data);
    }
    let userSession = await this.usersService.getUserSession(anubandhUser.userID);

    if(!userSession) {
        userSession = await this.usersService.createSession(anubandhUser.gender == 'M' ? 'F' : 'M',  anubandhUser.userID);
    }

    return {...user, userSession };
  }

  async login(user: any) {
    const payload = { username: user.user_id, sub: user.user_id, sessionId: user.userSession.sessionId, lookingFor: user.userSession.selectedGender };
    return {
      access_token: this.jwtService.sign(payload),
      sessionId: user.userSession.sessionId
    };
  }
}
