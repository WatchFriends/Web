import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { App } from "./app";
import { HomePage} from "./home.component";

@NgModule ({
    imports: [BrowserModule, FormsModule],
    declarations: [App, HomePage],
    bootstrap: [App,HomePage]
})

export class AppModule { }