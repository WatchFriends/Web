"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var App = (function () {
    function App() {
    }
    return App;
}());
App = __decorate([
    core_1.Component({
        selector: "app",
        templateUrl: "\n    <div>\n        <h1>Watchfriends</h1>\n        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, nihil. Asperiores voluptate ipsa sunt dolores, et fuga, nam deleniti rerum animi aspernatur quo quibusdam neque aut! Esse dignissimos eligendi quos.</p>\n    </div>\n    "
    })
], App);
exports.App = App;
