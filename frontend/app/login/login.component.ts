import { Component, OnInit } from '@angular/core';
import { UserService } from '../services';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = { email: '', password: '' };
  submitted = false;
  error: { message: string, status: number };

  constructor(private user: UserService) { }

  ngOnInit() { }

  submit(event: Event, form: NgForm) {
    event.preventDefault();
    this.submitted = true;
    this.user.login(this.model).subscribe(
      res => {//no error
        this.error = null;
        this.submitted = false;
      },
      err => {//error      
        this.error = err;
        this.submitted = false;
      });
  }

  openAuthWindow(provider: string) { }
}
