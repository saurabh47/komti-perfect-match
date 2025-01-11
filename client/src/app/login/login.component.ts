import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ NgIf, NgClass, IonicModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private userService: UsersService, private router: Router) {}

  login() {
    if (this.username && this.password) {
      this.userService.login(this.username, this.password).subscribe((resp: any) => {
        this.userService.setAuthToken(resp.access_token);
        this.router.navigate(['app']);
      }, (error)=> {
        alert('Unable to login Please check username & password');
      });
      // Add logic for login API integration
    } else {
      alert('Please enter both username and password.');
    }
  }

  redirectToAnonymousLogin() {
    this.router.navigate([ 'anonymous-login']);
  }
}
