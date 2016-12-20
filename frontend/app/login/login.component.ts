import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = { email: "", password: "" };

  public login(event: Event) {
    event.preventDefault();
    console.dir(this.model);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}

export class User {
  public email: string;
  public password: string;
}
