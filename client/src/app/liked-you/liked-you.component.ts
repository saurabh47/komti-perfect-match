import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { ProfilesService } from '../profiles.service';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
  selector: 'app-liked-you',
  templateUrl: './liked-you.component.html',
  imports: [IonicModule, ProfileCardComponent],
  styleUrls: ['./liked-you.component.scss'],
})
export class LikedYouComponent  implements OnInit {
  offset=0;
  limit=20;
  profiles: any[] = [];

  constructor(private profilesService: ProfilesService) {}

  ngOnInit() {
    this.loadMoreProfiles();
  }

  onIonInfinite(ev: any) {
    this.loadMoreProfiles(ev);
  }

  loadMoreProfiles(ev?: any) {
    this.profilesService.getLikedYouProfiles(this.offset, this.limit).subscribe((resp: any) => {
      this.profiles = [...this.profiles, ...resp];
      this.offset = this.offset + this.limit;
      if(ev) {
        setTimeout(() => {
          (ev as InfiniteScrollCustomEvent).target.complete();
        }, 500);
      }
    });
  }
}
