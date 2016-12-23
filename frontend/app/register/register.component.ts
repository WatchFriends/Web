import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  model = { email: "", password: "", password2: "", firstname: "", lastname: "" };
  submitted = false;

  constructor(private auth: AuthService) { }

  submit(event: Event){
    event.preventDefault();
    if(this.model.password === this.model.password2){
        this.submitted = true;
        this.auth.register(this.model)
        .subscribe(res => {
          console.dir(res);
          this.submitted = false;
        });
    }
  }


  ngOnInit() {
  }

}
