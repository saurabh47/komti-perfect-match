import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
    thumbsUpOutline,
    thumbsDownOutline,
    bookmarkOutline,
} from 'ionicons/icons';
import { ActionsService } from '../../actions.service';
@Component({
    selector: 'app-profile-actions',
    imports: [IonicModule],
    templateUrl: './profile-actions.component.html',
    styleUrls: ['./profile-actions.component.scss'],
})
export class ProfileActionsComponent implements OnInit {
    private defaultActions = [
        {
            action: 'LIKE',
            icon: 'thumbs-up-outline',
        },
        {
            action: 'DISLIKE',
            icon: 'thumbs-down-outline',
        },
        {
            action: 'SAVE',
            icon: 'bookmark-outline',
        },
    ];

    actions: Array<any> = [];

    @Input() profile: any;

    @Input() set selectedProfileFilter(val: string) {
      this.actions = this.defaultActions.filter(a => a.action != val);
    }

    @Output() afterAction: EventEmitter<any> = new EventEmitter();

    constructor(private actionsService: ActionsService) {
        addIcons({
            thumbsUpOutline,
            thumbsDownOutline,
            bookmarkOutline,
        });
    }

    ngOnInit() {}

    onAction(action: 'LIKE' | 'DISLIKE' | 'SAVE') {
        console.log(action);
        this.actionsService.updateAction(this.profile.user_id, action).subscribe(resp => console.log(resp));
        this.afterAction.emit(this.profile);
    }
}
