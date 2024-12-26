import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http: HttpClient, private usersService: UsersService) { }

  getProfiles(gender: 'M' | 'F' = 'F', offset =0, limit = 10) {
    const session = this.usersService.getUserSession() as any;

    return this.http.get('/api/profiles', {params: {sessionId: session.sessionId, gender, offset, limit}});
  }
}
