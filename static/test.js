// CanYouDo.Today
// Script by Tom Hill (http://hill.xyz)
// Uses moment.js library as a dependency (http://momentjs.com/)

var dayKeys = {
	0 : 'Sunday',
	1 : 'Monday',
	2 : 'Tuesday',
	3 : 'Wednesday',
	4 : 'Thursday',
	5 : 'Friday',
	6 : 'Saturday'
};

var headerHTML = '',
    hoursHTML = '',
	thisMoment,
	row;

var now = moment(),
	thisDay = now.startOf('day'),
	thisDayInWords = thisDay.format("dddd"),
	thisHour = now.startOf('hour');

function keyToDay(day) {
	return dayKeys[day];
}

dateStamps = []

for (var i = 0; i < 7; i++) {
	if (i == thisDay.format("e")) { // The current day of the week
		thisMoment = thisDay;
		headerHTML += '<th><b>' + keyToDay(i) + '<br/> <span class="date">' + thisMoment.format("Do MMM") + '</span></b></th>';
	} else if (i < thisDay.format("e")) { // An earlier day in the week
		thisMoment = moment().day(-i);
		addHeaderHTML( thisMoment );
	} else if (i > thisDay.format("e")) { // A later day in the week
		thisMoment = moment().day(i);
		addHeaderHTML( thisMoment );
	}

	var dayDateStamps = [];
	for (var j = 0; j < 12; j++) {
		dayDateStamps.push(thisMoment.startOf('day').add(j + 6, 'hours').format('lll'));
	}
	dateStamps.push(dayDateStamps);

}

function addHeaderHTML(thisMoment) {
	headerHTML += '<th>' + keyToDay(i) + '<br/> <span class="date">' + thisMoment.format("Do MMM") + '</span></th>';
}

function bodyFromDateStamps(dateStamps) {
	var tbody = document.getElementsByTagName('tbody')[0];
	for(var i = 0; i < 7 * 12; i++) { // 7 * 12 can be replaced by countMultiArray(dateStamps) if we need to do it dynamically
		if (i % 7 == 0) {
			row = tbody.insertRow(tbody.rows.length);
		}
		var cell = row.insertCell(i % 7);
		cell.innerHTML = dateStamps[i % 7][Math.floor(i/12)];
		cell.setAttribute("data-date-value", )


	}
}

// To be used instead of 7 * 12
function countMultiArray(array)
	var iter = 0
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			iter += 1
		}
	}
	return iter;
}

headerHTML += '</th>';

console.log(dateStamps);
bodyFromDateStamps(dateStamps);
$('.head-row').html(headerHTML);

/* Shit I tried but it didn't work so I gave up but I'm a hoarder so I don't get rid of it and just leave it in comments:

function bodyFromDateStamps(dateStamps) {
	var table = document.getElementById('our_table');
	var tbody = document.getElementsByTagName('tbody')[0]; v
	for (var i = 0; i < dateStamps.length; i++) {
		if (i % 7 == 0) {
			row = tbody.insertRow(tbody.rows.length);
		}
		for (var j = 0; j < )
		row.insertCell(i).innerHTML = dateStamps[i];
	}
}

function bodyFromDateStamps(dateStamps) {
	var tbody = $('tbody');
	for (var i = 0; i < 7; i++) {
		tbody.find('tr').each( function() {
			var trow = $(this);
			trow.append('<td>' + dateStamps[i] + '</td>');
		});
	}
}

*/
