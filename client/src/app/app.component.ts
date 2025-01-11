import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ProfilesService } from './profiles.service';
import { ProfileFiltersStoreService } from './profile-filters-store.service';
import { LoginComponent } from './login/login.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        IonicModule,
        TitleCasePipe,
        AsyncPipe,
        NgIf,
        LoginComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    appName = 'Komti Perfect Match';

    selectedGender?: 'M' | 'F';

    selectedProfileFilters = {
        age: { lower: 24, upper: 27 },
        height: { lower: 135, upper: 180 },
        incomeIds: null,
        educationAreaIds: null,
        numberOfBrothers: null,
        numberOfSisters: null,
    };

    constructor(
        private profilesService: ProfilesService,
        private profileFiltersStore: ProfileFiltersStoreService    ) {
    }

    ngOnInit(): void {
        forkJoin({
            annualIncomes: this.profilesService.getAnnualIncomes(),
            educationAreas: this.profilesService.getEducationAreas(),
        }).subscribe((resp) => {
            this.profileFiltersStore.setAnnualIncomes(resp.annualIncomes);
            this.profileFiltersStore.setEducationAreas(resp.educationAreas);
        });
    }
}
