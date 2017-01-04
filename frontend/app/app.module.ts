//packages
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, FormBuilder, NgControl} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {DropdownModule, CollapseModule} from 'ng2-bootstrap';
//components
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {SearchComponent} from './search/search.component';
import {HomeComponent} from './home/home.component';
import {ExploreComponent} from './explore/explore.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {SeriesDetailComponent} from "./seriesdetail/seriesdetail.component";
//services
import {AuthService, ApiService, UserService, SeriesDetailService} from './services';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        LoginComponent,
        RegisterComponent,
        ExploreComponent,
        SearchComponent,
        ProfileComponent,
        SeriesDetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DropdownModule.forRoot(),
        CollapseModule.forRoot(),
        RouterModule.forRoot([
            {path: "home", component: HomeComponent},
            {path: "login", component: LoginComponent},
            {path: "register", component: RegisterComponent},
            {path: "explore", component: ExploreComponent},
            {path: "profile", component: ProfileComponent},
            {path: "series/:id", component: SeriesDetailComponent},
            {path: "search", component: SearchComponent},
            {path: "**", redirectTo: "home"},
        ])
    ],
    providers: [
        UserService,
        AuthService,
        ApiService,
        SeriesDetailService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
