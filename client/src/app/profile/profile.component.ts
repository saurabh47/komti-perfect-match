import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { AsyncPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
    selector: 'app-profile',
    imports: [AsyncPipe, IonicModule, ProfileCardComponent],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    profile$;
    constructor(private usersService: UsersService) {
        this.profile$ = this.usersService.getProfile();
    }

    ngOnInit() {}

    toggleDetails(profile: any): void {
        if (profile.user_id != -1) {
            profile.showDetails = !profile.showDetails;
        }
    }

    logout() {
        this.usersService.logout();
    }
}
