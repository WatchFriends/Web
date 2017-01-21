import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent {

    constructor(public user: UserService) { }

    imageWelcome: string = 'http://www.siwallpaperhd.com/wp-content/uploads/2016/03/tv_series_viking_background_wallpaper.jpg';
    imageSeries: string = 'http://cdn.pcwallart.com/images/arrow-tv-series-wallpaper-2.jpg';
    imageFollowers: string = 'http://justgoodvibe.com/wp-content/uploads/2015/12/gotham-1.jpg';
    logoPng: string = '../../assets/WatchFriends_Logo_Blue.png';
    androidApp: string = '../../assets/android_app2.png';
    playStoreButton: string = '../../assets/google_play_store_btn.png';

    innerHeight: Number = window.innerHeight;
}