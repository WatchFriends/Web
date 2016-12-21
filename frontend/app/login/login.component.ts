import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = {email:'', password:''};
  submitted = false;
  achievements;

  submit(event: Event) {
    this.submitted = true;
    event.preventDefault();
    console.dir(this.model);
    this.auth.login(this.model).subscribe(res => {
      this.submitted = false;
    });
  }

  openAuthWindow(provider: string){

  }

  ngOnInit() {
    this.auth.achievements().subscribe(a=>this.achievements = a);
  }

  constructor(private router: Router, private auth: AuthService) { }

}
