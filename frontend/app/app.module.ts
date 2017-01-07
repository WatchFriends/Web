//packages
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, FormBuilder, NgControl} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {DropdownModule, CollapseModule} from 'ng2-bootstrap';
//services
import { SeriesImagePipe } from './pipes/series-image.pipe';
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
import {SeasonDetailComponent} from "./seasondetail/seasondetail.component";
//services
import {ApiService, AuthGuard, UserService} from './services';
import { ErrorComponent } from './error/error.component';

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
        SeriesDetailComponent,
        SeasonDetailComponent,
        ErrorComponent,
        SeriesImagePipe
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
            {path: "search", component: SearchComponent},
            {path: "error", component: ErrorComponent},
            {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]}, //userprofile
            {path: "profile/:id", component: ProfileComponent}, //friend profile
            {path: "series/:id", component: SeriesDetailComponent},
            {path: "series/:id/season/:seasonId", component: SeasonDetailComponent},
            {path: "**", redirectTo: "home"},
        ])
    ],
    providers: [
        UserService,
        AuthGuard,
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
