import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile-card',
  imports: [IonicModule, NgClass],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent  implements OnInit {

  @Input() profile: any;

  constructor() { }

  ngOnInit() {}

  toggleDetails(profile: any): void {
    profile.showDetails = !profile.showDetails;
  }

}
