import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { ActionsService } from '../actions.service';
import { chunk } from 'lodash';
import { ProfileActionsComponent } from './profile-actions/profile-actions.component';


@Component({
  selector: 'app-history',
  imports: [IonicModule, NgClass, NgIf, ProfileActionsComponent],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent  implements OnInit {
  selectedHistoryFilter: 'LIKE' | 'DISLIKE' | 'SAVE' = 'LIKE';
  offset=0;
  limit=20;
  items: any[] = [];
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
      const twoItemArray = chunk(resp, 2);
      this.items = [...this.items, ...twoItemArray];
      this.offset = this.offset + this.limit;
      setTimeout(() => {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }, 500);
    });
  }

  toggleDetails(card: any): void {
    card.showDetails = !card.showDetails;
  }

  onActionHistoryFilter(ev: any) {
    this.selectedHistoryFilter = ev.detail.value;
    this.offset=0;
    this.limit=20;
    this.items = [];
    this.profiles = [];
    this.loadMoreProfiles();
  }

  openLink(url: string) {
    window.open(url);
  }

  onRemoveProfile(profile: any, idx: number) {
    console.log(profile);
    console.log(this.profiles);
    this.profiles = this.profiles.filter(p => p.user_id != profile.user_id);
    console.log(this.profiles);

    const twoItemArray = chunk(this.profiles, 2);
    this.items = [...twoItemArray];
  }
}
