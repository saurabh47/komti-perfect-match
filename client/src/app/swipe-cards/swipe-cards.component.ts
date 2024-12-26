import { Component, Input } from '@angular/core';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ProfilesService } from '../profiles.service';
import { ActionsService } from '../actions.service';

@Component({
  selector: 'app-swipe-cards',
  imports: [CdkDrag, NgFor, NgIf, NgClass],
  templateUrl: './swipe-cards.component.html',
  styleUrl: './swipe-cards.component.scss',
  standalone: true
})
export class SwipeCardsComponent {

  profiles: any[] = [];
  offset = 0;
  limit = 10;
  @Input() gender: 'M' | 'F' = 'F';
  showEmoji = false;

  constructor(private profilesService: ProfilesService, 
      private actionsService: ActionsService) {}

  ngOnInit(): void {
    // Load initial profiles
    this.loadMoreProfiles();
  }

  loadMoreProfiles(): void {
    this.profilesService.getProfiles(this.gender, this.offset,this.limit).subscribe((nextProfiles:any) => {
      this.profiles = [...this.profiles, ...nextProfiles];
      this.offset = this.offset + this.limit;
    });
  }

  onSwipe(event: CdkDragEnd, card: any): void {
    const { x } = event.distance;
  
    if (x > 150) {
      // Swiped Right
      card.action = 'LIKE';
      setTimeout(() => this.removeCard(card), 300); // Delay removal for smooth animation
    } else if (x < -150) {
      // Swiped Left
      card.action = 'DISLIKE';
      setTimeout(() => this.removeCard(card), 300); // Delay removal for smooth animation
    } else {
      event.source.reset(); // Reset the card's position if not swiped enough
    }
  }
  
  removeCard(card: any): void {
    this.profiles = this.profiles.filter(c => c !== card);

    this.actionsService.createAction(card.user_id, card.action).subscribe(resp => console.log(resp));
    // Check if more profiles need to be loaded
    if (this.profiles.length < 5) {
      this.loadMoreProfiles();
    }
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
  
  swipe(action: string): void {
    const profile = this.profiles[0];
    profile.action = action;
    if (profile) {
      setTimeout(() => this.removeCard(profile), 300); // Simulate swipe right on button click
    }
  }

  saveProfile() {
    this.showEmoji = true;
    this.swipe('SAVE');
    // Hide the emoji after 3 seconds
    setTimeout(() => {
      this.showEmoji = false;
    }, 300); // Matches the duration of the animation
  }

  toggleDetails(card: any): void {
    card.showDetails = !card.showDetails;
  }
  
  handleKeyPress(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.swipe('DISLIKE');
        break;
      case 'ArrowRight':
        this.swipe('LIKE');
        break;
      case 'ArrowUp':
      case 'ArrowDown':
        this.saveProfile();
        break;
      default:
        break;
    }
  }
}
