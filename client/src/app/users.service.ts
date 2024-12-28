import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSession: any = null;

  constructor(private http: HttpClient) { }

  createSession(selectedGender: string) {
    return this.http.post('/api/users/sessions', { selectedGender });
  }

  getSessionDetails(sessionId: number): Observable<any> {
    return this.http.get(`/api/users/sessions/${sessionId}`);
  }

  updateProfileFilters(profileFilters: any) {
    return this.http.patch(`/api/users/sessions/${this.userSession?.sessionId}/profile-filters`, { profileFilters });
  }

  setUserSession(session: any) {
    this.userSession = session;
  }

  getUserSession() {
    return this.userSession;
  }
}
