/**
 * Created by michi on 7/12/2016.
 */

import{Component} from "@angular/core";

@Component({
    selector: 'home',
    template:`

<div class="container">


    <section class="home-section">
        <h1>Welcome to Watchfriends</h1>


        <div class="wrapper">
          <!--  <h2>Watchfriends is an online platform where you can track series you have watched</h2> -->
            <img class="img-home"
                 [src]="imageWelcome"
            >

            <button class="btnSignUp">Join Watchfriends</button>
            <button class="btnLogin">Already a member? Log in</button>

        </div>
    </section>

    <section class="home-section">
        <h1>Series</h1>
        <div class="wrapper">
          <!--  <h2>Searching for a serie to track?</h2> -->
            <img class="img-home" [src]="imageSeries">


            <button class="btnSignUp">Explore new series</button>

        </div>
    </section>
    <section class="home-section">
        <h1>Followers</h1>
        <div class="wrapper">
           <!-- <h2>Choose who you want to follow </h2>
            <h2>Keep track of their series</h2> -->
            <img class="img-home" [src]="imageFollowers">


            <button class="btnSignUp">Expand your network
            </button>

        </div>
    </section>


</div>
<footer>
    <p>Copyright © Michiel Zyde 2016</p>
</footer>



`
})

export class HomePage{

    imageWelcome: string = "http://cdn1-www.comingsoon.net/assets/uploads/gallery/the-walking-dead-season-7/the-walking-dead-season-7-rick-lincoln-michonne-gurira-cci-key-art-1200x707-1.jpg";
    imageSeries: string = "https://i.ytimg.com/vi/pvqZ7di5O_8/maxresdefault.jp";
    imageFollowers: string = "http://www.ew.com/sites/default/files/i/2015/06/23/minions.jpg";

}