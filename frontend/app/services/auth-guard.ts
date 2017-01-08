import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private user: UserService) { }

    canActivate() {
        if (this.user.authenticated) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
