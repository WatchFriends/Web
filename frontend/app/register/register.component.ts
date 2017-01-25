import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AuthGuard } from '../services';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'wfregister',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  model = { email: '', password: '', password2: '', firstname: '', lastname: '' };
  submitted = false;
  error;
  constructor(private user: UserService, private router: Router, private authGuard: AuthGuard) { }

  submit(event: Event, form: NgForm) {
    console.log("HELLO")
    event.preventDefault();
    this.submitted = true;
    this.user.register(this.model).subscribe(
      res => { // no error
        this.error = null;
        this.submitted = false;
        this.router.navigateByUrl(this.authGuard.redirectUrl || 'home');
      },
      err => { // error      
        this.error = err;
        this.submitted = false;
      });
  }
}
