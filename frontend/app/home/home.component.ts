import { Component, ViewEncapsulation } from '@angular/core';
import { UserService, ApiService } from '../services';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { Page, Series } from '../models';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent {

    imageWelcome: string = 'http://www.siwallpaperhd.com/wp-content/uploads/2016/03/tv_series_viking_background_wallpaper.jpg';
    imageSeries: string = 'http://cdn.pcwallart.com/images/arrow-tv-series-wallpaper-2.jpg';
    imageFollowers: string = 'http://justgoodvibe.com/wp-content/uploads/2015/12/gotham-1.jpg';
    logoPng: string = '../../assets/WatchFriends_Logo_Blue.png';
    androidApp: string = '../../assets/android_app2.png';
    playStoreButton: string = '../../assets/google_play_store_btn.png';

    activeSlideIndex: Number;
    innerHeight: Number = window.innerHeight;
    series: Series[];

    constructor(public user: UserService, private api: ApiService) {
        this.loadData();
    }

    loadData() {
        this.api.getPopularSeries(1).subscribe((page: Page<Series>) => {
            this.series = page.results;
        });
    }
}