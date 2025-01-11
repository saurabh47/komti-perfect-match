import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-layout',
    imports: [
        IonicModule,
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
