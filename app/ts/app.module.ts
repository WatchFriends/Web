import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { WfApp } from "./app";

@NgModule ({
    imports: [BrowserModule, FormsModule],
    declarations: [WfApp],
    bootstrap: [WfApp]
})

export class AppModule { }