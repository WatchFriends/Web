// packages
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, FormBuilder, NgControl} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {DropdownModule, CollapseModule, TooltipModule, AccordionModule} from 'ng2-bootstrap';
// services
import {ApiService, AuthGuard, UserService} from './services';
import {SeriesImagePipe, UserImagePipe} from './pipes';
// components
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {SearchComponent} from './search/search.component';
import {HomeComponent} from './home/home.component';
import {ExploreComponent} from './explore/explore.component';
import {LoginComponent} from './login/login.component';
import {WfLogin} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {SeriesDetailComponent} from './seriesdetail/seriesdetail.component';
import {SeasonDetailComponent} from './seasondetail/seasondetail.component';
import {ErrorComponent} from './error/error.component';
import {FeedComponent} from "./feed/feed.component";
//selectors
import {Wfseries} from "./components/series/series.component";
import {SettingsComponent} from './settings/settings.component';
import {WfShadow} from './components/shadow/shadow.component';
import {SocketService} from "./services/socket.service";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        LoginComponent,
        WfLogin,
        ExploreComponent,
        SearchComponent,
        ProfileComponent,
        SeriesDetailComponent,
        SeasonDetailComponent,
        ErrorComponent,
        FeedComponent,
        SeriesImagePipe,
        UserImagePipe,
        Wfseries,
        SettingsComponent,
        WfShadow
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DropdownModule.forRoot(),
        CollapseModule.forRoot(),
        TooltipModule.forRoot(),
        AccordionModule.forRoot(),
        RouterModule.forRoot([
            {path: 'home', component: HomeComponent},
            {path: 'login', component: LoginComponent},
            {path: 'register', component: WfLogin},
            {path: 'explore', component: ExploreComponent},
            {path: 'profile', component: ProfileComponent},
            {path: 'search/:query', component: SearchComponent},
            {path: 'error', component: ErrorComponent},
            {path: 'settings', component: SettingsComponent},
            {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}, // userprofile
            {path: 'profile/:id', component: ProfileComponent}, // friend profile
            {path: 'series/:id', component: SeriesDetailComponent},
            {path: 'series/:id/season/:seasonId', component: SeasonDetailComponent},
            {path: 'feed', component: FeedComponent},
            {path: '**', redirectTo: 'home'},
        ])
    ],
    providers: [
        UserService,
        AuthGuard,
        ApiService,
        SocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
