import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { SwipeCardsComponent } from './swipe-cards/swipe-cards.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SwipeCardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'client';

  selectedGender?: 'M' | 'F';

  constructor(private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      console.log(params.get("sessionId"))
      const sessionId = params.get("sessionId");
      if(sessionId) {
        this.usersService.getSessionDetails(sessionId as unknown as number).subscribe((session: any) => {
          this.selectedGender = session.selectedGender;
          this.usersService.setUserSession(session);
        })
      }
    });
  }

  selectOption(gender: 'M' | 'F') {
    this.usersService.createSession(gender).subscribe((session: any) => {
      console.log(session);
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: { sessionId: session.sessionId }});
      this.selectedGender = gender;
    });
  }
}
