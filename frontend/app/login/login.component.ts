import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = { email: '', password: '' };
  submitted = false;
  error: { message: string, status: number };

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  submit(event: Event, form) {
    event.preventDefault();
    this.submitted = true;    
    this.auth.login(this.model).subscribe(
      res => {//no error
        this.error = null;
        this.submitted = false;
      },
      err => {//error      
        console.log(this.error = err);
        this.submitted = false;
    });
  }

  openAuthWindow(provider: string) {

  }
}
