import { Component, OnInit } from '@angular/core';

@Component({

  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  series = [
    { image: "https://s-media-cache-ak0.pinimg.com/originals/e1/ed/00/e1ed00d0e786de281e1a2aceb8c70c3e.jpg", title: "The Walking Dead S01", id:0},
    { image: "http://cdn.playbuzz.com/cdn/e4f331a0-770b-4c08-85bf-556c30e49f0a/7398c906-3e69-4418-9fa8-7169511c1ee2.jpg", title: "The Walking Dead S02", id:1 },
    { image: "http://wallpaper.pickywallpapers.com/1920x1080/the-walking-dead-season-3.jpg", title: "The Walking Dead S03",  id:2 },
    { image: "http://all4desktop.com/data_images/1920%20x%201080/4150672-the-walking-dead-season-4.jpg", title: "The Walking Dead S04",  id:3 },
    { image: "http://freshwallpapers.net/download/5968/1920x1080/download/the-walking-dead-season-5-midseason.jpg", title: "The Walking Dead S05",  id:4 },
    { image: "https://images2.alphacoders.com/634/634380.jpg", title: "The Walking Dead S06",  id:5 },
    { image: "http://fandom.wikia.com/wp-content/uploads/2016/10/weekend-preview-walking-dead-negan-feature-hero.jpg", title: "The Walking Dead S07",  id:6 },
    { image: "https://i.ytimg.com/vi/JkqyKiXEpt0/maxresdefault.jpg", title: "Fear The Walking Dead S01", id:0 },
    { image: "http://gruesome.decadesofhorror.com/wp-content/uploads/sites/6/2016/04/FTWD-001.jpg", title: "Fear The Walking Dead S02", id:0 },
    { image: "http://www.hdwallpapers.in/download/walking_with_dinosaurs_3d-1920x1080.jpg", title: "Walking With Dinosaurs", id:0 },
  ];

  persons = [

  ];


}
