import { Component, OnInit } from '@angular/core';
import { UserService, ApiService } from '../services';
import { User } from '../models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public model;
  backgroundProfile =
  'http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg';

  constructor(public user: UserService, private api: ApiService) { }

  ngOnInit() {
    this.model = {
      name: this.user.name,
      email: this.user.email,
      picture: this.user.picture
    };
  }

  submit(event: Event, form) {
    event.preventDefault();
    console.log(this.model);
    if (this.model.password !== this.model.repeat) {
      // error to form
    }
    this.api.updateUserData(this.model).subscribe();
  }
}
