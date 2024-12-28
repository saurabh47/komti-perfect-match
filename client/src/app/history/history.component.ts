import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { ActionsService } from '../actions.service';
import { chunk } from 'lodash';


@Component({
  selector: 'app-history',
  imports: [IonicModule, NgFor, NgClass, NgIf, JsonPipe],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent  implements OnInit {
  _selectedHistoryFilter: 'LIKE' | 'DISLIKE' | 'SAVE' = 'LIKE';
  @Input() set selectedHistoryFilter(value: 'LIKE' | 'DISLIKE' | 'SAVE'){
    this._selectedHistoryFilter = value;
    this.offset=0;
    this.limit=20;
    this.items = [];
    this.loadMoreProfiles();
  }

  offset=0;
  limit=20;
  items: any[] = [];

  constructor(private actionsService: ActionsService) {}

  ngOnInit() {
    // this.loadMoreProfiles();
  }

  onIonInfinite(ev: any) {
    this.loadMoreProfiles();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  loadMoreProfiles() {
    this.actionsService.getActionsBySessionAndAction(this._selectedHistoryFilter, this.offset, this.limit).subscribe((resp: any) => {
      const twoItemArray = chunk(resp, 2);
      this.items = [...this.items, ...twoItemArray];
      console.log(this.items)
      this.offset = this.offset + this.limit;
    });
  }

  toggleDetails(card: any): void {
    card.showDetails = !card.showDetails;
  }
}
