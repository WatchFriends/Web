"use strict";

(function() {

    var images = [];

    function init() {

        images = document.querySelectorAll(".imagecontainer, .imagecontainer__wrapper, .imagecontainer__content");
    }

    function setHeight() {

        for (var i = images.length; i--;) {

            images[i].style.height = window.innerHeight + "px";
        }
    }

    init();
    setHeight();
})();