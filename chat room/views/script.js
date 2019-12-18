let user_name = $("#username_input");
var set_user = $("#set_user");
var chat_box = $(".chat-box");
var message = $("#message_input");
var send_button = $("#send_msg")

send_button.hide();
message.hide();

var socket = io.connect(window.location.host);

socket.on('user-connected', function(user) {
    var text = user.name + " has connected";
    chat_box.append(`
            <p class= "chat-alert">` + text + `</p>
            `)
});

var load_content = function(url, current_user) {
    $.get(url, function(data) {
        chat_box.empty()
        $.each(data.messages, function(i, msg) {
            var text = msg.user + ": " + msg.text;
            if (msg.user == current_user) {
                chat_box.append(`
                <p class= "chat-personal">` + text + `</p>
            `)
            } else {
                chat_box.append(`
                    <p class= "chat-alert">` + text + `</p>
                `)
            }
        })
    })
}




set_user.on("click", function() {
    if (user_name.val() != "") {
        socket.emit('user-connected', {
            'name': user_name.val()
        });
        user_name = $("#username_input").val();
        $("#username_input").hide();
        $("#set_user").hide();
        $("#warning").hide();
        $("#send_msg").show();
        $("#message_input").show();
    } else {
        alert("Please enter a username first");
    }
    load_content('http://' + window.location.host + '/api/message', user_name)
})

socket.on('new-message', function(new_msg) {
    var text = new_msg.name + ": " + new_msg.text;
    if (new_msg.name == user_name) {
        chat_box.append(`
        <p class= "chat-personal">` + text + `</p>
    `)
    } else {
        chat_box.append(`
            <p class= "chat-alert">` + text + `</p>
        `)
    }
});

send_button.on("click", function() {
    if ($("#message_input").val() != "") {

        $.post('http://' + window.location.host + '/api/message', { user: user_name, text: $("#message_input").val() });
        socket.emit('new-message', {
            'name': user_name,
            'text': $("#message_input").val()
        });
    } else {
        alert("You cannot send empty messages")
    };
    $("#message_input").val('');
})

socket.on('user-left', function(user) {
    var text = user.name + ": Left the chat room"
    chat_box.append(`
        <p class= "chat-alert">` + text + `</p>
    `)
});

window.onbeforeunload = function(e) {
    if (user_name != "") {
        socket.emit('user-left', {
            'name': user_name
        });
    }
};