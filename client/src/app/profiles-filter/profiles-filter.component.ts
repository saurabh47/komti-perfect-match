import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, RangeCustomEvent } from '@ionic/angular';
import { HeightFormatPipe } from '../height-format.pipe';
import { cloneDeep, isEqual } from 'lodash';
import { ProfileFiltersStoreService } from '../profile-filters-store.service';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-profiles-filter',
  imports: [IonicModule, FormsModule, HeightFormatPipe, AsyncPipe],
  templateUrl: './profiles-filter.component.html',
  styleUrls: ['./profiles-filter.component.scss'],
})
export class ProfilesFilterComponent  implements OnInit {
  _model: any = {};
  _internalModel: any = {};

  @Input() set model(value: any) {
    this._model = value;
    this._internalModel = cloneDeep(value);
    console.log(this._internalModel);
  }

  constructor(private modalCtrl: ModalController, 
    public filtersStore: ProfileFiltersStoreService) {
      addIcons({ close });
    }

  ngOnInit(): void {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if(isEqual(this._model , this._internalModel)) {
      return this.modalCtrl.dismiss({}, 'cancel');
    } else {
      return this.modalCtrl.dismiss(this._internalModel, 'confirm');
    }
  }

  onAgeRangeChange(ev: any) {
    console.log((ev as RangeCustomEvent).detail.value);
    this._internalModel = {...this._internalModel, age: (ev as RangeCustomEvent).detail.value}
  }

  onHeightRangeChange(ev: any) {
    this._internalModel = {...this._internalModel, height: (ev as RangeCustomEvent).detail.value}
  }
}
