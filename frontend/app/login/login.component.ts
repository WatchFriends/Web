import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public model = new User();

  constructor() { }

  ngOnInit() {
  }

}

export class User {
  public email: string;
  public password: string;
}
