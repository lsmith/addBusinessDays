/**
 * addBusinessDays( d, plusDays )
 *
 * Choose the right implementation for your needs.  If you need more than one
 * make sure you change the name(s) of any additional versions.
 */

///////////////////////////////
//  modifies the input Date  //
///////////////////////////////
function addBusinessDays(d,n) {
    var day = d.getDay();

    d.setDate(
        d.getDate() + n +
        (day === 6 ? 2 : +!day) +
        (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));
}

///////////////////////////////////////
//  creates and modifies a new Date  //
///////////////////////////////////////
function addBusinessDays(d,n) {
    d = new Date(d.getTime());

    var day = d.getDay();

    d.setDate(
        d.getDate() + n +
        (day === 6 ? 2 : +!day) +
        (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));

    return d;
}

// Used by both holiday aware versions below
// TODO: make this more abstract to support dynamically calculated holidays?
addBusinessDays.holidays = {
    all: {
        '0101': 1, // or true
        // TODO: Fill in common (US) holidays
        '1225': 1
    },
    2009: {
        // Same format for things like Thanksgiving or other holidays that
        // fall on e.g. the 3rd Monday of April in a given year
    },
    2010: {
        // And so on for other years.  Manual update required :(
    }
};

// Used to test a Date instance against the holiday map above
addBusinessDays.isHoliday = function (d) {
    function zeroPad(n) {
        n |= 0;
        return (n < 10 ? '0' : '') + n;
    }

    var day = zeroPad(d.getMonth() + 1) + zeroPad(d.getDate());

    return addBusinessDays.holidays.all[day] ||
           addBusinessDays.holidays[d.getFullYear()][day];
};

//////////////////////////////////////////////////////
//  modifies the input Date, accounts for holidays  //
//////////////////////////////////////////////////////
function addBusinessDays(d,n) {
    var day = d.getDay();

    d.setDate(
        d.getDate() + n +
        (day === 6 ? 2 : +!day) +
        (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));

    if (addBusinessDays.isHoliday(d)) {
        addBusinessDays(d,1);
    }
}


//////////////////////////////////////////////////////////////
//  creates and modifies a new Date, accounts for holidays  //
//////////////////////////////////////////////////////////////
var addBusinessDays = (function () {

    function add(d,n) {
        var day = d.getDay();

        d.setDate(
            d.getDate() + n +
            (day === 6 ? 2 : +!day) +
            (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));

        if (addBusinessDays.isHoliday(d)) {
            add(d,1);
        }
    }

    return function (d,n) {
        return add(new Date(d.getTime()),n);
    }
})();
