import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AuthGuard } from '../services';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public model = { email: '', password: '' };
  public submitted = false;
  public error: { message: string, status: number };

  constructor(private user: UserService, private router: Router, private authGuard: AuthGuard) { }

  ngOnInit() { }

  submit(event: Event, form: NgForm) {
    event.preventDefault();
    this.submitted = true;
    this.user.login(this.model).subscribe(
      res => {// no error
        this.error = null;
        this.submitted = false;
        this.router.navigateByUrl(this.authGuard.redirectUrl || 'home');
      },
      err => {// error
        this.error = err;
        this.submitted = false;
      });
  }

  openAuthWindow(provider: string) { }
}
