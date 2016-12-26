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

    function carousel(){
        var mainSlider = document.getElementById('carousel-poster');
        mainSlider.addEventListener('slide.bs.carousel', function(e) {
            // get the caption of current active item before slide
            var active = mainSlider.querySelector('.item.active .carousel-caption');
            active.classList.remove('slide')
        });
        mainSlider.addEventListener('slid.bs.carousel', function(e) {
            // get the caption of new active item after slide
            var active = mainSlider.querySelector('.item.active .carousel-caption');
            active.classList.add('slide')
        });
    }

    init();
    setHeight();
})();