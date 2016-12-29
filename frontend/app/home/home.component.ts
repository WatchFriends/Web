import { Component } from "@angular/core";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {

    imageWelcome: string = "http://www.siwallpaperhd.com/wp-content/uploads/2016/03/tv_series_viking_background_wallpaper.jpg";
    imageSeries: string = "http://cdn.pcwallart.com/images/arrow-tv-series-wallpaper-2.jpg";
    imageFollowers: string = "http://justgoodvibe.com/wp-content/uploads/2015/12/gotham-1.jpg";
    logoPng: string = "../../assets/WatchFriends_Logo_Blue.png";
    androidApp: string = "../../assets/android_app2.png";
    playStoreButton: string = "../../assets/google_play_store_btn.png";

    innerHeight: Number = window.innerHeight;
    public posters = [
        { image: "https://image.tmdb.org/t/p/w500/b8BgPfjNjSZHpX75TyWaj5GHZT1.jpg", title: "The walking dead", active: true },
        { image: "https://image.tmdb.org/t/p/w500/1Dmrgwv8VcTWQOaoyWm71KOeFEE.jpg", title: "Eastlanders" },
        { image: "https://image.tmdb.org/t/p/w500/igDhbYQTvact1SbNDbzoeiFBGda.jpg", title: "Doctor who" }
    ];
}