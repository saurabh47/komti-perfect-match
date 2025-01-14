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
    return this.http.post('/api/actions', {userId, action});
  }

  deleteAction(
    userId: number,
    action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ){
    return this.http.delete('/api/actions', {body:{userId, action}});
  }

  updateAction(
    userId: number,
    action: 'LIKE' | 'DISLIKE' | 'SAVE',
  ) {
    return this.http.put('/api/actions', {userId, action});
  }

  getActionsBySessionAndAction(
    action: 'LIKE' | 'DISLIKE' | 'SAVE',
    offset =0, limit = 10
  ) {
    return this.http.get(`/api/actions/${action}`, {params: {offset, limit}});
  }
}
