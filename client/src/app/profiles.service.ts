import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http: HttpClient) { }

  getProfiles(gender: 'M' | 'F' = 'F', offset =0, limit = 10) {
    return this.http.get('/api/profiles', {params: {gender, offset, limit}});
  }
}
