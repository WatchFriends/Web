import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {

    redirectUrl: string;

    constructor(private router: Router, private user: UserService) { }

    canActivate(route, state): Observable<boolean> | boolean {
        return this.user.authenticated$.map(bool => {
            if (!bool) {
                this.redirectUrl = state.url;
                this.router.navigate(['/login']);
            }
            return bool;
        }).first();
    }
}
