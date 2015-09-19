//Phony constants
var USERNAME = 'USERNAME';
var GET_MESSAGE_SERVICE = 'http://playdoh.algonquincollege.com/lts/mike/WebServices/MessageService.asmx/GetMessages';

var SEND_MESSAGE_SERVICE = 'http://playdoh.algonquincollege.com/lts/mike/WebServices/MessageService.asmx/SendMessage';

/**
Getting messages from the server
*/
function getMessages() {
    $.ajax({
        url: GET_MESSAGE_SERVICE,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: onGetMessageSuccess,
    });
    error: onAjaxError
}

function onAjaxError(jqXHR, status, errorThrown) {
    $("error").html(status + ": " + errorThrown + "<br><br>" +
        jqXHR.responseText)
}

function onGetMessageSuccess(data) {
    var messageList = data.d;

    for (var i in messageList) {
        if (messageList[i].username == USERNAME)
            messageList[i].username = "BigBoss";

        var $item = createFromTemplate('messageTemplate',
            messageList[i]);

        $item.appendTo('#messages');
    }
}

function sendMessage() {
    var msg = $('#txtMessage').val();

    if (msg.length > 0) {
        $.ajax({
            url: SEND_MESSAGE_SERVICE,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                username: USERNAME,
                message: msg
            }),
            success: onGetMessageSuccess, // Returns the list of messages
            error: onAjaxError
        });
    }

    // Clear the message field
    $('#txtMessage').val("");
}


/**
Create a jQuery object from the provided template element
*/

function createFromTemplate(id, data) {
    //Append a hash tag to the id if one did not exist
    if (id.indexOf('#') != 0)
        id = '#' + id;

    //Get the html contents of the element with the provided id
    var html = $(id).html();

    //Replace data placeholders
    for (var param in data) {
        while (html.indexOf('[' + param + ']') != -1) {
            html = html.replace('[' + param + ']', data[param]);
        }
    }

    return $(html);
}