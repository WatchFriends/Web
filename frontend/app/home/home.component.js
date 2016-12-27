"use strict";

(function() {
    var images = [],
        body,
        height,
        position = 0;

    function init() {
        images =  document.querySelectorAll(".imagecontainer, .imagecontainer_wrapper, .imagecontainer_content, .contentcontainer");
        body = document.body;
        height = window.innerHeight;
        //document.getElementsByClassName("carousel").carousel();
    }

    function setHeight() {
        for (var i = images.length; i--;) {
            images[i].style.height = height + "px";
        }
    }

    init();
    setHeight();
})();