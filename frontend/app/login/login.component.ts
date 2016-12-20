import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = {};

  public login() {
    console.log("login function");
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}

export class User {
  public email: string;
  public password: string;
}
