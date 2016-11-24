import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { WfHome } from "./home";

@NgModule ({
    imports: [BrowserModule, FormsModule],
    declarations: [WfHome],
    bootstrap: [WfHome]
})

export class AppModule { }