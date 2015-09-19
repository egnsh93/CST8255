/*global alert, Game, $*/
$(function () {
    'use strict';

    // Initialize the tabs
    $("#tabs").tabs();

    $('.scores-name').append('<ul></ul>');
    $('.scores-score').append('<ul></ul>');

    // Get the scores from the web service
    $.ajax({
        type: "GET",
        url: "http://playdoh.algonquincollege.com/lts/mike/WebServices/MessageService.asmx/GetScores",
        dataType: "xml",
        success: function (xml) {
            $(xml).find('Score').each(function () {
                var name = $(this).find('name').text(),
                    score = $(this).find('score').text();

                $('<li></li>').html(name).appendTo('.scores-name ul');
                $('<li></li>').html(score).appendTo('.scores-score ul');
            });
        },
        error: function () {
            alert("An error occurred while processing XML file.");
        }
    });
});