import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-anonymous-login',
  imports:[IonicModule, RouterModule],
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
      this.router.navigate(['app/people']).then(() => {
        window.location.reload();
      });
    })
  }

}
