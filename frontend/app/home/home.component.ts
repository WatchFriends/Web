import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

    public imageWelcome = 'http://www.siwallpaperhd.com/wp-content/uploads/2016/03/tv_series_viking_background_wallpaper.jpg';
    public imageSeries = 'http://cdn.pcwallart.com/images/arrow-tv-series-wallpaper-2.jpg';
    public imageFollowers = 'http://justgoodvibe.com/wp-content/uploads/2015/12/gotham-1.jpg';
    public logoPng = 'assets/WatchFriends_Logo_Blue.png';
    public androidApp = 'assets/android_app2.png';
    public playStoreButton = 'assets/google_play_store_btn.png';

    public innerHeight: Number;

    constructor(public user: UserService) {
        const getHeight = () => window.innerHeight;

         Observable.fromEvent(window, 'resize')
            .map(getHeight)
            .startWith(getHeight())
            .subscribe(height => this.innerHeight = height);
    }
}
