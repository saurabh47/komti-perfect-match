import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { ActionsService } from '../actions.service';
import { ProfileActionsComponent } from './profile-actions/profile-actions.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';


@Component({
  selector: 'app-history',
  imports: [IonicModule,ProfileCardComponent, ProfileActionsComponent],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent  implements OnInit {
  selectedHistoryFilter: 'LIKE' | 'DISLIKE' | 'SAVE' = 'LIKE';
  offset=0;
  limit=20;
  profiles: any[] = [];

  constructor(private actionsService: ActionsService) {}

  ngOnInit() {
    this.loadMoreProfiles();
  }

  onIonInfinite(ev: any) {
    this.loadMoreProfiles(ev);
  }

  loadMoreProfiles(ev?: any) {
    this.actionsService.getActionsBySessionAndAction(this.selectedHistoryFilter, this.offset, this.limit).subscribe((resp: any) => {
      this.profiles = [...this.profiles, ...resp];
      this.offset = this.offset + this.limit;
      if(ev) {
        setTimeout(() => {
          (ev as InfiniteScrollCustomEvent).target.complete();
        }, 500);
      }
    });
  }

  toggleDetails(profile: any): void {
      profile.showDetails = !profile.showDetails;
  }

  onActionHistoryFilter(ev: any) {
    this.selectedHistoryFilter = ev.detail.value;
    this.offset=0;
    this.limit=20;
    this.profiles = [];
    this.loadMoreProfiles();
  }

  openLink(url: string) {
    window.open(url);
  }

  onRemoveProfile(profile: any, idx: number) {
    this.profiles = this.profiles.filter(p => p.user_id != profile.user_id);
  }
}
