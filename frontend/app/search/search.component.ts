import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService, UserService} from '../services';

@Component({

  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  seriesListDisplay: String = "block";
  usersDisplay: String = "none";

  series = [
    { image: "https://s-media-cache-ak0.pinimg.com/originals/e1/ed/00/e1ed00d0e786de281e1a2aceb8c70c3e.jpg", title: "The Walking Dead", id:0},
    { image: "http://datas.series-tv-shows.com/pic/tvdb/61080/fanart.jpg", title: "Walking The Nile", id:1 },
    { image:  null, title: "Walking The Himalayas",  id:2 },
    { image: "http://images.j-14.com/uploads/photos/file/145031/walk-the-prank-3.jpg", title: "Walk The Prank",  id:3 },
    { image: "http://image.tmdb.org/t/p/original/zrNdNMXrI9xzDbyVip4XGzCg6hG.jpg", title: "Walking With Monsters",  id:4 },
    { image: "https://ichef.bbci.co.uk/images/ic/1920x1080/p0403zx8.jpg", title: "Weatherman Walking",  id:5 },
    { image: null, title: "Walking Through Time",  id:6 },
    { image: "http://gruesome.decadesofhorror.com/wp-content/uploads/sites/6/2016/04/FTWD-001.jpg", title: "Fear The Walking Dead", id:7 },
    { image: "http://www.hdwallpapers.in/download/walking_with_dinosaurs_3d-1920x1080.jpg", title: "Walking With Dinosaurs", id:8 },
    { image: null, title: "To Walk Invisible", id:9 },
  ];

  users = [
    { image: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg", name:"Michiel Zyde", id:0},
    { image: "http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg", name:"Jasper De Sutter", id:1},

  ];

  //indien image niet gevonden wordt op tmdb API, deze gebruiken

  imageNotFound: string= "http://orig10.deviantart.net/ac68/f/2011/061/f/3/404_by_edenpulse-d3arr9q.png";


  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private api: ApiService, private user: UserService){
  }

  ngOnInit(){
    this.route.params
        .switchMap((params : Params) => {
          var id = params['id'];
          if(!id) id = this.user.id;
          return this.api.getUserData(id);
        })
        .subscribe(user => {

        });
  }

  transformHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  transformDescription(text: string, next: Number): String {
    return text.replace(/%d/, next.toString());
  }

  changeContent(menu: Number) {

    let usersMenu = document.querySelector('a[data-hover="Users"]'),
        serieListMenu = document.querySelector('a[data-hover="Series"]');

    switch (menu) {
      case 0:
        this.seriesListDisplay = "block";
        this.usersDisplay = "none";

        usersMenu.classList.add("active");
        serieListMenu.classList.remove("active");
        break;
      case 1:
        this.seriesListDisplay = "none";
        this.usersDisplay = "block";

        usersMenu.classList.remove("active");
        serieListMenu.classList.add("active");
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
