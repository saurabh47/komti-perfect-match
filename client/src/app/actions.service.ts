import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(private http: HttpClient, private usersService: UsersService) { }

  createAction(
    userId: number,
    action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ) {
    const session = this.usersService.getUserSession() as any;
    return this.http.post('/api/actions', {sessionId: session.sessionId, userId, action});
  }

  getActionsBySessionAndAction(
    action: 'LIKE' | 'DISLIKE' | 'SAVE',
    offset =0, limit = 10
  ) {
    const session = this.usersService.getUserSession() as any;
    return this.http.get(`/api/actions/${session.sessionId}/${action}`, {params: {offset, limit}});
  }
}
