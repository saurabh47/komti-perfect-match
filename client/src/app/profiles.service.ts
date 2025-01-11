import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http: HttpClient, private usersService: UsersService) { }

  getProfiles(offset =0, limit = 10, filters = {}) {
    return this.http.post('/api/profiles', filters, {params: { offset, limit}});
  }

  getAnnualIncomes() {
    return this.http.get('/api/profiles/annual-incomes');
  }

  getEducationAreas() {
    return this.http.get(`/api/profiles/education-areas`);
  }
}
