import { Component } from '@angular/core';

@Component({

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  name: String = "Michiel Zyde";
  followers: Number = 15;
  backgroundProfile: string = "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg";
  profilePicture: string = "https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/14051786_1146069705449340_95700626649935794_n.jpg?oh=04be87d50b50a66ce9b42022df8b2fe5&oe=58E04019";
  // handig om mss bij de hover ook het aantal episodes die je bekijkt van een serie te tonen?

  watchlist = [
    { image: "http://wallpapersqq.net/wp-content/uploads/2015/11/Zoo-tv-series-6.jpg", title: "Zoo", id:0, episodes: 3},
    { image: "https://wallpaperscraft.com/image/vikings_tv_series_historical_drama_katheryn_winnick_lagertha_sword_shield_nature_94816_1920x1080.jpg", title: "Vikings", id:0, episodes: 5},
    { image: "http://wallpapersdsc.net/wp-content/uploads/2016/08/Salem-Wallpapers.jpg", title: "Salem", id:0, episodes: 2},
    { image: "http://wallpapersinsider.com/wp-content/uploads/2016/04/Preacher-TV-Series-Wallpapers.jpg", title: "Lucifer", id:0, episodes: 1},
    { image: "http://www.wallpapermade.com/images/wallpapers/originals/gotham-characters-in-a-dark-street-wallpaper-3476.jpg", title: "Gotham", id:0, episodes: 10},
    { image: "http://cdn.wallpapersafari.com/87/70/jywP9k.jpg", title: "Suits", id:0, episodes: 5},
    { image: "http://cdn.wallpapersafari.com/87/70/jywP9k.jpg", title: "Suits", id:0, episodes: 5},
    { image: "http://cdn.wallpapersafari.com/87/70/jywP9k.jpg", title: "Suits", id:0, episodes: 5} 
  ];
  watchlistLength = this.watchlist.length;
  achievements = [
    { image: "../../assets/achievements/BeginnerFollower.svg", title: "Follower", subtitle: "Followed 6 people" ,progresstitle: "Progress till next achievement", progress: "6/10"},
    { image: "../../assets/achievements/BeginnerTracker.svg", title: "Tracker", subtitle: "Tracked 6 series" ,progresstitle: "Progress till next achievement", progress: "6/10"},
    { image: "../../assets/achievements/BeginnerWatch.svg", title: "Watcher", subtitle: "Watched 6 hours" ,progresstitle: "Progress till next achievement", progress: "6/10"},


  ];


}
