import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model = { email: "", password: "", password2: "", firstname: "", lastname: "" };
  submitted = false;
  error;
  constructor(private auth: AuthService) { }

  submit(event: Event, form) {
    event.preventDefault();
    this.submitted = true;    
    this.auth.register(this.model).subscribe(
      res => {//no error
        this.error = null;
        this.submitted = false;
      },
      err => {//error      
        console.log(this.error = err);
        this.submitted = false;
    });
  }


  ngOnInit() {
  }

}
