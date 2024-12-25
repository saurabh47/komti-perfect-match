import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwipeCardsComponent } from './swipe-cards/swipe-cards.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SwipeCardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';

  gender?: 'M' | 'F';

  selectOption(gender: 'M' | 'F') {
    this.gender = gender;
  }
}
