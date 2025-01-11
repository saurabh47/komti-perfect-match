import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSession: any = null;
  private authToken: string | null;

  constructor(private http: HttpClient, private router: Router) {
    this.authToken = localStorage.getItem('authToken');
  }

  login(username: string, password: string) {
    return this.http.post('/api/auth/login', {username, password});
  }


  anonymousLogin(selectedGender: string) {
    return this.http.post('/api/auth/anonymous-login', {selectedGender});
  }

  setAuthToken(token: string) {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  logout() {
    this.authToken = null;
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getAuthToken() {
    return this.authToken;
  }

  getProfile() {
    return this.http.get<any>('/api/auth/profile');
  }

  createSession(selectedGender: string) {
    return this.http.post('/api/users/sessions', { selectedGender });
  }

  getSessionDetails(): Observable<any> {
    return this.http.get(`/api/users/session`);
  }

  updateProfileFilters(profileFilters: any) {
    return this.http.patch(`/api/users/session/profile-filters`, { profileFilters });
  }

  setUserSession(session: any) {
    this.userSession = session;
  }

  getUserSession() {
    return this.userSession;
  }
}
