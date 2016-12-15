import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app/app.component";
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

@NgModule ({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule, 
        FormsModule,
        HttpModule,
        RouterModule.forRoot([])
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }