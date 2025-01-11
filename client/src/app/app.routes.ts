import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'anonymous-login' },
    { path: 'login', component: LoginComponent },
    {
        path: 'app',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'people'
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import('./profile/profile.component').then(
                        (m) => m.ProfileComponent
                    ),
            },
            {
                path: 'people',
                loadComponent: () =>
                    import('./people/people.component').then(
                        (m) => m.PeopleComponent
                    ),
            },
            {
                path: 'history',
                loadComponent: () =>
                import('./history/history.component').then(
                    (m) => m.HistoryComponent
                ),
            },
            {
                path: 'liked-you',
                loadComponent: () =>
                import('./liked-you/liked-you.component').then(
                    (m) => m.LikedYouComponent
                ),
            }
        ],
    },
    { path: 'anonymous-login', component: AnonymousLoginComponent }
];
