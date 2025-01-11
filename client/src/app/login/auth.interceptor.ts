import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { UsersService } from "../users.service";
import { inject } from "@angular/core";
import { Observable } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    // Inject the current `AuthService` and use it to get an authentication token:
    const authToken = inject(UsersService).getAuthToken();
    // Clone the request to add the authentication header.
    if(authToken) {
        const newReq = req.clone({
            headers: req.headers.append('Authorization', `Bearer ${authToken}`),
          });
          return next(newReq);
    }
    return next(req);
  }