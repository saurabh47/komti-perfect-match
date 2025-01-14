import { Component, Input } from '@angular/core';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { ProfilesService } from '../profiles.service';
import { ActionsService } from '../actions.service';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { bookmarkOutline } from 'ionicons/icons';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
    selector: 'app-swipe-cards',
    imports: [CdkDrag, IonicModule, ProfileCardComponent],
    templateUrl: './swipe-cards.component.html',
    styleUrl: './swipe-cards.component.scss',
})
export class SwipeCardsComponent {
    profiles: any[] = [];
    _profileFilters = {};
    offset = 0;
    limit = 10;
    @Input() gender: 'M' | 'F' = 'F';

    @Input() set profileFilters(value: any) {
        this._profileFilters = value;
        this.profiles = [];
        this.offset = 0;
        this.limit = 10;
        this.loadMoreProfiles();
    }

    profileSwiped: any = null;

    showEmoji = false;

    constructor(
        private profilesService: ProfilesService,
        private actionsService: ActionsService
    ) {
        addIcons({
            bookmarkOutline,
        });
    }

    ngOnInit(): void {}

    loadMoreProfiles(): void {
        this.profilesService
            .getProfiles(this.offset, this.limit, this._profileFilters)
            .subscribe((nextProfiles: any) => {
                this.profiles = [...this.profiles, ...nextProfiles];
                this.offset = this.offset + this.limit;
            });
    }

    onSwipe(event: CdkDragEnd, profile: any): void {
        const { x } = event.distance;

        if (x > 150) {
            // Swiped Right
            profile.action = 'LIKE';
            setTimeout(() => this.removeProfile(profile), 300); // Delay removal for smooth animation
        } else if (x < -150) {
            // Swiped Left
            profile.action = 'DISLIKE';
            setTimeout(() => this.removeProfile(profile), 300); // Delay removal for smooth animation
        } else {
            event.source.reset(); // Reset the card's position if not swiped enough
        }
    }

    removeProfile(profile: any): void {
        this.profiles = this.profiles.filter((c) => c !== profile);

        this.profileSwiped = profile;
        this.actionsService
            .createAction(profile.user_id, profile.action)
            .subscribe((resp) => console.log(resp));
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
            setTimeout(() => this.removeProfile(profile), 300); // Simulate swipe right on button click
        }
    }

    undoAction() {
        if (this.profileSwiped) {
            this.profiles = [this.profileSwiped, ...this.profiles];

            setTimeout(() => {
                this.actionsService
                    .deleteAction(
                        this.profileSwiped.user_id,
                        this.profileSwiped.action
                    )
                    .subscribe((resp) => console.log(resp));
                this.profileSwiped.action = null;
                this.profileSwiped = null;
            }, 300); // Simulate swipe right on button click
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
            case 'u':
                this.undoAction();
                break;
            case 'U':
                this.undoAction();
                break;
            case 'Shift':
                this.undoAction();
                break;
            default:
                break;
        }
    }
}
