import {Component, ViewEncapsulation} from '@angular/core';

@Component({

    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent {

    seriesListDisplay: String = "block";
    usersDisplay: String = "none";

    series = [
        {
            image: "https://s-media-cache-ak0.pinimg.com/originals/e1/ed/00/e1ed00d0e786de281e1a2aceb8c70c3e.jpg",
            title: "The Walking Dead",
            id: 0
        },
        {image: "http://datas.series-tv-shows.com/pic/tvdb/61080/fanart.jpg", title: "Walking The Nile", id: 1},
        {image: null, title: "Walking The Himalayas", id: 2},
        {
            image: "http://images.j-14.com/uploads/photos/file/145031/walk-the-prank-3.jpg",
            title: "Walk The Prank",
            id: 3
        },
        {
            image: "http://image.tmdb.org/t/p/original/zrNdNMXrI9xzDbyVip4XGzCg6hG.jpg",
            title: "Walking With Monsters",
            id: 4
        },
        {image: "https://ichef.bbci.co.uk/images/ic/1920x1080/p0403zx8.jpg", title: "Weatherman Walking", id: 5},
        {image: null, title: "Walking Through Time", id: 6},
        {
            image: "http://gruesome.decadesofhorror.com/wp-content/uploads/sites/6/2016/04/FTWD-001.jpg",
            title: "Fear The Walking Dead",
            id: 7
        },
        {
            image: "http://www.hdwallpapers.in/download/walking_with_dinosaurs_3d-1920x1080.jpg",
            title: "Walking With Dinosaurs",
            id: 8
        },
        {image: null, title: "To Walk Invisible", id: 9},
    ];

    users = [
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/14051786_1146069705449340_95700626649935794_n.jpg?oh=04be87d50b50a66ce9b42022df8b2fe5&oe=58E04019",
            name: "Walking Zyde",
            id: 0
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/13669143_10208452039593036_5304103475273177345_n.jpg?oh=8491f29f569abc9cc00c893e65d2fddf&oe=58E4993F",
            name: "Jasper De Walker",
            id: 1
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/11039195_10203824854083815_2557549902659964070_n.jpg?oh=457660b7b09f23754e24625e56da4abb&oe=58D612F5",
            name: "Michiel Walker",
            id: 2
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: "https://avatars0.githubusercontent.com/u/16222780?v=3&s=400",
            name: "Hein Walkerino",
            id: 3
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/11836866_10206094665699493_6572247882328430829_n.jpg?oh=675b607a032e28da8c56a3d46433fa71&oe=58E029DA",
            name: "Walking Bril",
            id: 4
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: null,
            name: "Johan Walkanova",
            id: 5
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/15590294_10211835490869313_8136982269238255413_n.jpg?oh=92ed2d78686f05625bb38866031f26e0&oe=58D75F7C",
            name: "Tiziano Walkaert",
            id: 6
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: null,
            name: "Jeffrey Walkscan",
            id: 7
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: null,
            name: "Cedric Déwalker",
            id: 8
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/14962696_1121567744579730_5797069381015325117_n.jpg?oh=8aadc6df1b8fc841ac5d26d3551a6953&oe=58DBD583",
            name: "Walking Samoy",
            id: 9
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: null,
            name: "Adriaan Walkertje",
            id: 10
        },
        {
            bgimage: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg",
            profileImage: "https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/13434802_1006213446160868_5039911884103601512_n.jpg?oh=6c0faabb90e00e9cf0cb38bbbb332058&oe=58DD07AD",
            name: "Walk Muylle",
            id: 11
        },
    ];

    //indien image niet gevonden wordt op tmdb API, deze gebruiken

    imageNotFound: string = "http://orig10.deviantart.net/ac68/f/2011/061/f/3/404_by_edenpulse-d3arr9q.png";
    userNotFound: string = "https://bitslog.files.wordpress.com/2013/01/unknown-person1.gif";

    changeContent(menu: Number) {

        let usersMenu = document.querySelector('a[data-hover="Users"]'),
            serieListMenu = document.querySelector('a[data-hover="Series"]');

        switch (menu) {
            case 0:
                this.seriesListDisplay = "block";
                this.usersDisplay = "none";

                usersMenu.classList.remove("active");
                serieListMenu.classList.add("active");

                break;
            case 1:
                this.seriesListDisplay = "none";
                this.usersDisplay = "block";

                usersMenu.classList.add("active");
                serieListMenu.classList.remove("active");
                break;
            default:
                this.seriesListDisplay = "block";
                this.usersDisplay = "none";

                usersMenu.classList.add("active");
                serieListMenu.classList.remove("active");
                break;


        }
    }
}
