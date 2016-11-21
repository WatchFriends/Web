(function(){
    "use strict";

    var socket, votingButtons;

    function init(){

        socket = io();
        votingButtons = document.getElementsByClassName("btn--voting");
    }

    function addEventListeners() {
        
        for (var i = votingButtons.lenght; i--; ) {

            votingButtons[i].addEventListener("click", function(e) {

                socket.emit('vote', (e.target || e.srcElement).dataset.vote);
            });
        }
    }

    init();
    addEventListener();
}());