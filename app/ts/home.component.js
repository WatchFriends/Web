/**
 * Created by michi on 7/12/2016.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var HomePage = (function () {
    function HomePage() {
        this.imageWelcome = "http://cdn1-www.comingsoon.net/assets/uploads/gallery/the-walking-dead-season-7/the-walking-dead-season-7-rick-lincoln-michonne-gurira-cci-key-art-1200x707-1.jpg";
        this.imageSeries = "https://i.ytimg.com/vi/pvqZ7di5O_8/maxresdefault.jp";
        this.imageFollowers = "http://www.ew.com/sites/default/files/i/2015/06/23/minions.jpg";
    }
    return HomePage;
}());
HomePage = __decorate([
    core_1.Component({
        selector: 'home',
        template: "\n\n<div class=\"container\">\n\n\n    <section class=\"home-section\">\n        <h1>Welcome to Watchfriends</h1>\n\n\n        <div class=\"wrapper\">\n          <!--  <h2>Watchfriends is an online platform where you can track series you have watched</h2> -->\n            <img class=\"img-home\"\n                 [src]=\"imageWelcome\"\n            >\n\n            <button class=\"btnSignUp\">Join Watchfriends</button>\n            <button class=\"btnLogin\">Already a member? Log in</button>\n\n        </div>\n    </section>\n\n    <section class=\"home-section\">\n        <h1>Series</h1>\n        <div class=\"wrapper\">\n          <!--  <h2>Searching for a serie to track?</h2> -->\n            <img class=\"img-home\" [src]=\"imageSeries\">\n\n\n            <button class=\"btnSignUp\">Explore new series</button>\n\n        </div>\n    </section>\n    <section class=\"home-section\">\n        <h1>Followers</h1>\n        <div class=\"wrapper\">\n           <!-- <h2>Choose who you want to follow </h2>\n            <h2>Keep track of their series</h2> -->\n            <img class=\"img-home\" [src]=\"imageFollowers\">\n\n\n            <button class=\"btnSignUp\">Expand your network\n            </button>\n\n        </div>\n    </section>\n\n\n</div>\n<footer>\n    <p>Copyright \u00A9 Michiel Zyde 2016</p>\n</footer>\n\n\n\n"
    })
], HomePage);
exports.HomePage = HomePage;
