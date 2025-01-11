import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe, NgClass, IonicModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
  profile$;
  constructor(private usersService: UsersService, private router: Router) { 
    this.profile$ = this.usersService.getProfile();
  }

  ngOnInit() {

  }

  toggleDetails(card: any): void {
    card.showDetails = !card.showDetails;
  }

  redirectToLoginPage() {
    this.router.navigate(['login']);
  }

  logout() {
    this.usersService.logout();
}

}
