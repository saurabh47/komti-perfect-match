import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anonymous-login',
  templateUrl: './anonymous-login.component.html',
  styleUrls: ['./anonymous-login.component.scss'],
})
export class AnonymousLoginComponent  implements OnInit {
  appName = 'Komti Perfect Match';

  selectedGender?: 'M' | 'F';

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {}
 
  selectOption(gender: 'M' | 'F') {
    this.usersService.anonymousLogin(gender).subscribe((resp:any) => {
      this.usersService.setAuthToken(resp.access_token);
      this.router.navigate(['app/people']);
    })
  }

}
