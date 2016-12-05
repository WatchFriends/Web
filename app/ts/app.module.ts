import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { App } from "./app";

@NgModule ({
    imports: [BrowserModule, FormsModule],
    declarations: [App],
    bootstrap: [App]
})

export class AppModule { }