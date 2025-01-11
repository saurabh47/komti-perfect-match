import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { authInterceptor } from './login/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor]),
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),provideHttpClient(), provideIonicAngular({}),
    importProvidersFrom(IonicModule.forRoot({ mode: 'md' })),
  ],
};
