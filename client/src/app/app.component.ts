import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SwipeCardsComponent } from './swipe-cards/swipe-cards.component';
import { UsersService } from './users.service';
import { addIcons } from 'ionicons';
import { search, people, thumbsUpOutline, thumbsDownOutline, bookmarkOutline,personOutline,returnUpBackOutline,optionsOutline, heartOutline, peopleOutline, bookmarksOutline, reorderFourOutline, bodyOutline,womanOutline,layersOutline } from 'ionicons/icons';
import { IonicModule, ModalController } from '@ionic/angular';
import { HistoryComponent } from './history/history.component';
import { TitleCasePipe } from '@angular/common';
import { ProfilesFilterComponent } from './profiles-filter/profiles-filter.component';
import { forkJoin } from 'rxjs';
import { ProfilesService } from './profiles.service';
import { ProfileFiltersStoreService } from './profile-filters-store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IonicModule, SwipeCardsComponent, HistoryComponent, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  appName = 'Komti Perfect Match';
  
  selectedGender?: 'M' | 'F';

  selectedHistoryFilter: 'LIKE' | 'DISLIKE' | 'SAVE' = 'LIKE';

  selectedProfileFilters =  { age: {lower: 24, upper: 27}, 
                              height: { lower: 135, upper: 180},
                              incomeIds: null,
                              educationAreaIds: null,
                              numberOfBrothers: null,
                              numberOfSisters: null
                            };

  constructor(private usersService: UsersService,
    private profilesService: ProfilesService,
    private profileFiltersStore: ProfileFiltersStoreService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController) {
      addIcons({ search, people,thumbsUpOutline,thumbsDownOutline,bookmarkOutline,personOutline,returnUpBackOutline,optionsOutline, heartOutline, peopleOutline, bookmarksOutline, reorderFourOutline, bodyOutline, womanOutline, layersOutline});
    }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const sessionId = params.get("sessionId");
      if(sessionId) {
        forkJoin({ session : this.usersService.getSessionDetails(sessionId as unknown as number),
                  annualIncomes: this.profilesService.getAnnualIncomes(),
                  educationAreas: this.profilesService.getEducationAreas()
        }).subscribe(resp => {
          this.selectedGender = resp.session.selectedGender;
          this.selectedProfileFilters = resp.session.profileFilters ?? this.selectedProfileFilters;
          this.usersService.setUserSession(resp.session);

          this.profileFiltersStore.setAnnualIncomes(resp.annualIncomes);
          this.profileFiltersStore.setEducationAreas(resp.educationAreas);
        });
      }
    });
  }

  selectOption(gender: 'M' | 'F') {
    this.usersService.createSession(gender).subscribe((session: any) => {
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { sessionId: session.sessionId }});
      this.selectedGender = gender;
    });
  }

  onActionHistoryFilter(ev: any) {
    this.selectedHistoryFilter = ev.detail.value;
  }

  async openProfileFilterModel() {
    const modal = await this.modalCtrl.create({
      component: ProfilesFilterComponent,
      componentProps: { model: this.selectedProfileFilters }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.selectedProfileFilters = data;

      this.usersService.updateProfileFilters(this.selectedProfileFilters).subscribe(resp => console.info(resp));
    }
  }
}
