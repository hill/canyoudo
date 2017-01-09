
// Calendar setup

var current = new Date(),
    date = current.getDate(),
    day = current.getDay(),
    month = current.getMonth(),
    weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var headerHTML = '',
    hoursHTML = '';


for (var i=0;i<7;i++) {
    if (day != i) {
        var thisDay = day - i;
        var thisDate = date - thisDay;
        headerHTML += '<th>' + weekdays[i] + '<br/> <span class="date">' + thisDate + '/' + months[month] + '</span></th>';
    } else {
        headerHTML += '<th><b>' + weekdays[i] + '</b><br/> <span class="date">' + date + '/' + months[month] + '</span></th>';
    }

}

for (var j=0;j<13;j++) {
    hoursHTML += '<tr>';
    for (var i=0;i<7;i++) {
        var thisDay = day - i;
        var thisDate = date - thisDay;
        if (i<thisDay) {
            if (j<=6) {
                hoursHTML += '<td class="done" data-date-value="' + thisDate + '_'+ month +'_16_' + (j+6) + '00"><strike>' + (j+6) + ':00</strike></td>';
            } else {
                hoursHTML += '<td class="done" data-date-value="' + thisDate + '_'+ month +'_16_' + (j-6) + '00">' + (j-6) + ':00</td>';
            }
        } else {
            if (j<=6) {
                hoursHTML += '<td data-date-value="' + thisDate + '_'+ month +'_16_' + (j+6) + '00">' + (j+6) + ':00</td>';
            } else {
                hoursHTML += '<td data-date-value="' + thisDate + '_'+ month +'_16_' + (j-6) + '00">' + (j-6) + ':00</td>';
            }
        }


    }
    hoursHTML += '</tr>'
}

$('.head-row').html(headerHTML);
$('tbody').html(hoursHTML);



// Date Selection

$(function () {
    var isMouseDown = false,
    isHighlighted;
    $("#our_table td").mousedown(function () {
        isMouseDown = true;
        $(this).toggleClass("highlighted");
        //console.log($(this).data('date-value'));
        isHighlighted = $(this).hasClass("highlighted");
        return false; // prevent text selection
    }).mouseover(function () {
        if (isMouseDown) {
            $(this).toggleClass("highlighted", isHighlighted);
            //console.log($(this).data('date-value'));
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
        //console.log( index + ": " + $( this ).data('date-value') );
        selectedDates.push( $(this).data('date-value') );
    });
    //console.log(selectedDates);
    email = $("input[name='email']").val();
    //console.log(email);
    passcode = $("input[name='passcode']").val();
    //console.log(passcode);

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
