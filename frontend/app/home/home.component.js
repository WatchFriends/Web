"use strict";

(function() {
    var containers = [],
        imagewrappers = [],
        body, height, width, position = 0;

    function init() {
        containers = document.querySelectorAll(".imagecontainer, .imagecontainer_wrapper, .imagecontainer_content, .contentcontainer");
        imagewrappers = document.querySelectorAll(".imagecontainer_wrapper");
        body = document.body;
        height = window.innerHeight;
        width = window.innerWidth;
        //document.getElementsByClassName("carousel").carousel();
    }

    function setHeight() {
        for (var i = containers.length; i--;) {
            containers[i].style.height = height + "px";
        }

        if (parseInt(width) <= 992) {
            for (var i = imagewrappers.length; i--;) {
                imagewrappers[i].style.width = width + "px";
            }
        }
    }

    init();
    setHeight();
})();