import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwipeCardsComponent } from '../swipe-cards/swipe-cards.component';
import { addIcons } from 'ionicons';
import {
    search,
    people,
    thumbsUpOutline,
    thumbsDownOutline,
    bookmarkOutline,
    personOutline,
    returnUpBackOutline,
    optionsOutline,
    heartOutline,
    peopleOutline,
    bookmarksOutline,
    reorderFourOutline,
    bodyOutline,
    womanOutline,
    layersOutline,
    barChartOutline,
    logOutOutline
} from 'ionicons/icons';
import { IonicModule } from '@ionic/angular';
import { HistoryComponent } from '../history/history.component';
import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
    selector: 'app-layout',
    imports: [
        RouterOutlet,
        IonicModule,
        SwipeCardsComponent,
        HistoryComponent,
        TitleCasePipe,
        AsyncPipe,
        NgIf,
        LoginComponent,
        ProfileComponent
    ],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
    appName = 'Komti Perfect Match';

    constructor(
            ) {
        addIcons({
            search,
            people,
            thumbsUpOutline,
            thumbsDownOutline,
            bookmarkOutline,
            personOutline,
            returnUpBackOutline,
            optionsOutline,
            heartOutline,
            peopleOutline,
            bookmarksOutline,
            reorderFourOutline,
            bodyOutline,
            womanOutline,
            layersOutline,
            barChartOutline,
            logOutOutline
        });
    }

    ngOnInit(): void {
        
    }

}
