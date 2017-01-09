// Date Selection
$(function () {
    var isMouseDown = false,
    isHighlighted;
    $("#our_table td").mousedown(function () {
        isMouseDown = true;
        $(this).toggleClass("highlighted");
        isHighlighted = $(this).hasClass("highlighted");
        return false; // prevent text selection
    }).mouseover(function () {
        if (isMouseDown) {
            $(this).toggleClass("highlighted", isHighlighted);
        }
    }).bind("selectstart", function () {
        return false;
    })

    $(document).mouseup(function () {
        isMouseDown = false;
    });
});

// Compile the selected dates into selectedDates on submit
var selectedDates = [];
var email = '';
var passcode = '';

$('#dateForm').submit(function (event) {
    event.preventDefault();
    $( ".highlighted" ).each(function( index ) {
        selectedDates.push( $(this).data('date-value') );
    });

    email = $("input[name='email']").val();
	passcode = $("input[name='passcode']").val();


    // Jam selectedDates in with any other form information into a JSON object

    info = {
        selectedDates: selectedDates,
        email: email,
        passcode: passcode
    }

    json_data = JSON.stringify(info, null, '\t');
    console.log(json_data);

    // Ship it off to the server

    $.ajax({
        type: "POST",
        url: "/",
        data: json_data,
        contentType: 'application/json;charset=UTF-8',
        success: function (result) {
            $('#completedText').html('Sent!');
        }
    });

});
