"use strict";

(function() {

    var images = [];

    function init() {

        images = document.getElementsByClassName("img-home");
    }

    function setHeight() {

        for (var i = images.length; i--;) {

            images[i].css.height = window.height;
        }
    }

    init();
})();