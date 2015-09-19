/*global $, document*/
$(document).ready(function () {
    'use strict';
    
    // When the user clicks a planet button
    $('nav ul li a').click(function() {
        // Set the hash to the value of title attribute
        var hash = $(this).attr("title");
        
        // Scroll to the id with the hash value
        $('html, body').animate({
            scrollTop: $("#" + hash).offset().top
        }, 2000);
    });
    
    // Load audio file and metadata via jQuery to improve performance
    $('audio').trigger('load');
    
    // Bind a click event to the play button to start audio
    $('.play').click(function() {
        $('audio').trigger('play');
    });
    
    // Bind a click event to the pause button to pause audio
    $('.pause').click(function() {
        $('audio').trigger('pause');
    });
});