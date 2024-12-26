import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSession = null;

  constructor(private http: HttpClient) { }

  createSession(selectedGender: string) {
    return this.http.post('/api/users/sessions', { selectedGender });
  }

  getSessionDetails(sessionId: number) {
    return this.http.get(`/api/users/sessions/${sessionId}`);
  }

  setUserSession(session: any) {
    this.userSession = session;
  }

  getUserSession() {
    return this.userSession;
  }
}
