import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
        { image: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/tZjVVIYXACV4IIIhXeIM59ytqwS.jpg", title: "Rogue One: A Star Wars Story", id:330459, episodes: 5},
        { image: "https://image.tmdb.org/t/p/w533_and_h300_bestv2/eSzpy96DwBujGFj0xMbXBcGcfxX.jpg", title: "Breaking Bad", id:1396, episodes: 5} 
    ];
    
    achievements = [
        { 
            image: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" style="enable-background:new 0 0 300 300;" xml:space="preserve"><path class="svgpath" d="M194.5,101.5c10.3-10.8,16.6-25.4,16.6-41.4C211.1,26.9,184.2,0,151,0C117.9,0,91,26.9,91,60.1 c0,15.8,6.1,30.2,16.1,40.9c-33.7,10.4-58.4,41.8-58.4,78.8v84.8c0,19.4,15.9,35.3,35.3,35.3h129.6c20.7,0,37.7-17,37.7-37.7v-82.5 C251.3,143.4,227.4,112.4,194.5,101.5z"/></svg>`, 
            name: "Follower", 
            description: "Followed %d people", 
            progress: 6,
            next: 35,
            status: "brons"
        }, { 
            image: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" style="enable-background:new 0 0 300 300;" xml:space="preserve"><path class="svgpath" d="M263.1,218.1l2.6-4.5l13.5,7.8c11.4-20.5,18.1-43.9,18.6-68.9H282v-5.2h15.7c-0.4-25-7-48.5-18.4-69l-13.7,7.9 l-2.6-4.5l13.7-7.9c-12.4-20.7-29.8-38.1-50.5-50.5l-7.9,13.7l-4.5-2.6l7.9-13.7c-20.5-11.4-44-18-69-18.4v15.7h-5.2V2.4 c-25,0.5-48.4,7.1-68.9,18.6l7.8,13.5L82,37.1l-7.8-13.5C53.6,36,36.3,53.4,23.9,74.1l13.4,7.7l-2.6,4.5l-13.4-7.7 C10,99,3.4,122.4,3,147.4h15.3v5.2H3c0.5,24.9,7.1,48.3,18.5,68.7l13.2-7.6l2.6,4.5l-13.2,7.6c12.4,20.6,29.7,37.9,50.3,50.3 l7.6-13.2l4.5,2.6l-7.6,13.2c20.4,11.3,43.8,18,68.7,18.4v-15.3h5.2v15.3c24.9-0.4,48.4-7,68.8-18.3l-7.7-13.3l4.5-2.6l7.7,13.3 c20.7-12.4,38-29.7,50.5-50.3L263.1,218.1z M228.1,55.1l-66.9,92.5c0.4,2.9,0,5.8-1.3,8.5l47.1,71.5c0.9,1.3,0.5,3.1-0.8,4l-8.4,5.6 c-1.3,0.8-3,0.5-3.8-0.8L146,163.7c-3.1-0.3-6.2-1.6-8.6-4c-5.5-5.5-5.5-14.3,0-19.8c3.6-3.6,8.6-4.8,13.2-3.7l65.1-90 c0.9-1.2,2.5-1.5,3.7-0.6l7.9,5.7C228.7,52.1,229,53.9,228.1,55.1z"/></svg>`, 
            name: "Tracker", 
            description: "Tracked %d series", 
            progress: 6,
            next: 20,
            status: "silver"
        }, { 
            image: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" style="enable-background:new 0 0 300 300;" xml:space="preserve"><path class="svgpath" d="M263.1,218.1l2.6-4.5l13.5,7.8c11.4-20.5,18.1-43.9,18.6-68.9H282v-5.2h15.7c-0.4-25-7-48.5-18.4-69l-13.7,7.9 l-2.6-4.5l13.7-7.9c-12.4-20.7-29.8-38.1-50.5-50.5l-7.9,13.7l-4.5-2.6l7.9-13.7c-20.5-11.4-44-18-69-18.4v15.7h-5.2V2.4 c-25,0.5-48.4,7.1-68.9,18.6l7.8,13.5L82,37.1l-7.8-13.5C53.6,36,36.3,53.4,23.9,74.1l13.4,7.7l-2.6,4.5l-13.4-7.7 C10,99,3.4,122.4,3,147.4h15.3v5.2H3c0.5,24.9,7.1,48.3,18.5,68.7l13.2-7.6l2.6,4.5l-13.2,7.6c12.4,20.6,29.7,37.9,50.3,50.3 l7.6-13.2l4.5,2.6l-7.6,13.2c20.4,11.3,43.8,18,68.7,18.4v-15.3h5.2v15.3c24.9-0.4,48.4-7,68.8-18.3l-7.7-13.3l4.5-2.6l7.7,13.3 c20.7-12.4,38-29.7,50.5-50.3L263.1,218.1z M228.1,55.1l-66.9,92.5c0.4,2.9,0,5.8-1.3,8.5l47.1,71.5c0.9,1.3,0.5,3.1-0.8,4l-8.4,5.6 c-1.3,0.8-3,0.5-3.8-0.8L146,163.7c-3.1-0.3-6.2-1.6-8.6-4c-5.5-5.5-5.5-14.3,0-19.8c3.6-3.6,8.6-4.8,13.2-3.7l65.1-90 c0.9-1.2,2.5-1.5,3.7-0.6l7.9,5.7C228.7,52.1,229,53.9,228.1,55.1z"/></svg>`, 
            name: "Watcher", 
            description: "Watched %d hours", 
            progress: 6,
            next: 50,
            status: "gold"
        }
    ];
}
