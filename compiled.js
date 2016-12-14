var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("app.component", ["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, AppComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            AppComponent = (function () {
                function AppComponent() {
                    this.pageTitle = 'WatchFriends';
                }
                return AppComponent;
            }());
            AppComponent = __decorate([
                core_1.Component({
                    selector: "wf-app",
                    templateUrl: "<div><h1>{{pageTitle}}</h1>\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, nihil. Asperiores voluptate ipsa sunt dolores, et fuga, nam deleniti rerum animi aspernatur quo quibusdam neque aut! Esse dignissimos eligendi quos.</p>\n</div>"
                }),
                __metadata("design:paramtypes", [])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
        }
    };
});
System.register("app.module", ["@angular/core", "@angular/platform-browser", "@angular/forms", "app.component"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, platform_browser_1, forms_1, app_component_1, AppModule;
    return {
        setters: [
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_2.NgModule({
                    declarations: [
                        app_component_1.AppComponent
                    ],
                    imports: [
                        platform_browser_1.BrowserModule,
                        forms_1.FormsModule
                    ],
                    bootstrap: [app_component_1.AppComponent]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            exports_2("AppModule", AppModule);
        }
    };
});
System.register("home.component", ["@angular/core"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3, HomePage;
    return {
        setters: [
            function (core_3_1) {
                core_3 = core_3_1;
            }
        ],
        execute: function () {
            HomePage = (function () {
                function HomePage() {
                    this.imageWelcome = "http://cdn1-www.comingsoon.net/assets/uploads/gallery/the-walking-dead-season-7/the-walking-dead-season-7-rick-lincoln-michonne-gurira-cci-key-art-1200x707-1.jpg";
                    this.imageSeries = "https://i.ytimg.com/vi/pvqZ7di5O_8/maxresdefault.jp";
                    this.imageFollowers = "http://www.ew.com/sites/default/files/i/2015/06/23/minions.jpg";
                }
                return HomePage;
            }());
            HomePage = __decorate([
                core_3.Component({
                    selector: 'home',
                    template: "\n<div class=\"container\">\n\n    <section class=\"home-section\">\n        <h1>Welcome to Watchfriends</h1>\n\n        <div class=\"wrapper\">\n            <!--  <h2>Watchfriends is an online platform where you can track series you have watched</h2> -->\n            <img class=\"img-home\" [src]=\"imageWelcome\" />\n\n            <button class=\"btnSignUp\">Join Watchfriends</button>\n            <button class=\"btnLogin\">Already a member? Log in</button>\n        </div>\n    </section>\n\n    <section class=\"home-section\">\n        <h1>Series</h1>\n        <div class=\"wrapper\">\n            <!--  <h2>Searching for a serie to track?</h2> -->\n            <img class=\"img-home\" [src]=\"imageSeries\"/>\n\n            <button class=\"btnSignUp\">Explore new series</button>\n        </div>\n    </section>\n\n    <section class=\"home-section\">\n        <h1>Followers</h1>\n        <div class=\"wrapper\">\n            <!-- <h2>Choose who you want to follow </h2>\n            <h2>Keep track of their series</h2> -->\n            <img class=\"img-home\" [src]=\"imageFollowers\"/>\n\n            <button class=\"btnSignUp\">Expand your network</button>\n        </div>\n    </section>\n\n</div>"
                }),
                __metadata("design:paramtypes", [])
            ], HomePage);
            exports_3("HomePage", HomePage);
        }
    };
});
System.register("main", ["@angular/platform-browser-dynamic", "app.module"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var platform_browser_dynamic_1, app_module_1;
    return {
        setters: [
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }
        ],
        execute: function () {
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
        }
    };
});
