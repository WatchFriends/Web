"use strict";

(function() {

    var images = [];
    var overlays = [];

    function init() {

        images = document.querySelectorAll(".imagecontainer, .imagecontainer__wrapper, .imagecontainer__content");
        //overlays = document.getElementsByClassName(""); 
    }

    function setHeight() {

        for (var i = images.length; i--;) {

            images[i].style.height = window.innerHeight + "px";
        }
    }

    init();
    setHeight();
})();