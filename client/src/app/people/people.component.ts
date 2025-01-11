import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { SwipeCardsComponent } from '../swipe-cards/swipe-cards.component';
import { ProfilesFilterComponent } from '../profiles-filter/profiles-filter.component';
import { UsersService } from '../users.service';

@Component({
    selector: 'app-people',
    imports: [IonicModule, SwipeCardsComponent],
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
    appName = 'Komti Perfect Match';

    selectedGender: 'M' | 'F' = 'F';

    selectedHistoryFilter: 'LIKE' | 'DISLIKE' | 'SAVE' = 'LIKE';

    defaultProfileFilters = {
        age: { lower: 24, upper: 27 },
        height: { lower: 135, upper: 180 },
        incomeIds: null,
        educationAreaIds: null,
        numberOfBrothers: null,
        numberOfSisters: null,
    };
    selectedProfileFilters = null;

    constructor(
        private modalCtrl: ModalController,
        private usersService: UsersService
    ) {}

    ngOnInit() {
        this.usersService.getSessionDetails().subscribe((session) => {
            this.usersService.setUserSession(session);
            this.selectedGender = session.selectedGender;
            this.selectedProfileFilters =
                session.profileFilters ?? this.defaultProfileFilters;
        });
    }

    async openProfileFilterModel() {
        const modal = await this.modalCtrl.create({
            component: ProfilesFilterComponent,
            componentProps: { model: this.selectedProfileFilters },
        });
        modal.present();

        const { data, role } = await modal.onWillDismiss();

        if (role === 'confirm') {
            this.selectedProfileFilters = data;

            this.usersService
                .updateProfileFilters(this.selectedProfileFilters)
                .subscribe((resp) => console.info(resp));
        }
    }

    onActionHistoryFilter(ev: any) {
        this.selectedHistoryFilter = ev.detail.value;
    }
}
