import { Component, OnInit } from '@angular/core';
import { UserService, ApiService } from '../services';
import { User } from '../models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  backgroundProfile: string = 'http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg';
  profilePicture: string = 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/14051786_1146069705449340_95700626649935794_n.jpg?oh=04be87d50b50a66ce9b42022df8b2fe5&oe=58E04019';
  constructor(public user: UserService, private api: ApiService) { }

  model;

  ngOnInit() {
    this.model = {
      name: this.user.name,
      email: this.user.email,
      picture: this.user.picture
    };
  }

  submit(event: Event, form){
    event.preventDefault();
    console.log(this.model);
    if(this.model.password !== this.model.repeat){
      // error to form
    }
    this.api.updateUserData(this.model).subscribe();
  }
}
