import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { TestComponent} from "./test.component";

@NgModule ({
    declarations: [
        AppComponent,
        TestComponent
    ],
    imports: [
        BrowserModule, 
        FormsModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }