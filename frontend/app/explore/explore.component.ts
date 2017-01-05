import { Component} from '@angular/core';

@Component({
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent  {

    series = [
        { image: 'http://fanaru.com/suits/image/6805-suits-suits.jpg', title: 'Suits', id:0},
        { image: 'http://www.araspot.com/wp-content/uploads/2016/01/second-chance-season-1-wallpaper-desktop-background-j0md1g8q0w.jpg', title: 'Chance', id:1 },
        { image: 'http://wallpapersdsc.net/wp-content/uploads/2015/11/286.jpg', title: 'The Flash', id:2 },
        { image: 'http://hdwallpaperbackgrounds.net/wp-content/uploads/2015/10/Game-Of-Thrones-Emilia-Clarke-With-Dragon-on-Shoulder-Wallpaper-1920x1080.jpg', title: 'Game of Thrones', id:0 },
        { image: 'http://wallpapercave.com/wp/DXq0duZ.jpg', title: 'Hannibal', id:0 },
        { image: 'http://wallpapercave.com/wp/U4sY2La.jpg', title: 'The walking dead', id:0 },
        { image: 'https://wallpaperscraft.com/image/dexter_michael_c_hall_polyethylene_99093_1920x1080.jpg', title: 'Dexter', id:0 },
        { image: 'http://www.thewallpapers.org/photo/77346/Silicon-Valley-002.jpg', title: 'Silicon valley', id:0 },
        { image: 'http://www.pixelstalk.net/wp-content/uploads/2016/07/The-100-TV-Series-Wallpapers-HD.jpg', title: 'The 100', id:0 },
        { image: 'http://eskipaper.com/images/breaking-bad-wallpaper-3.jpg', title: 'Breaking Bad', id:0 },
    ];
    //'http://www.desktopimages.org/pictures/2014/0309/1/orig_60277.jpg', 'http://www.araspot.com/wp-content/uploads/2016/01/second-chance-season-1-wallpaper-desktop-background-j0md1g8q0w.jpg'];
    //index: number = 0;
}