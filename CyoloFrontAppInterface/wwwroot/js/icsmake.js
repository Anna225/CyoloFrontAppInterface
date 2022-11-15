// thanks to https://jsfiddle.net/UselessCode/qm5AG/ as a starting point
(function () {
    // Some code for initialization on page load here.
})();

var icsFile = null;
function downloadCourtCase(elem, id) {
    var tr = $(elem).parent().parent();
    var tds = $(tr).find("td");
    var eventDate = {
        start: {
            day: $(tds[4]).text(),
            time: $(tds[5]).text()
        },
        end: {
            day: $(tds[4]).text(),
            time: $(tds[5]).text()
        }
    };
    var summary = "Meeting";
    var description =
        "CourtCaseNo:" + $(tds[1]).text() +
        ", Jurisdiction:" + $(tds[2]).text() +
        ", Chamber ID: " + $(tds[4]).text() +
        ", Hearing Date: " + $(tds[4]).text() +
        ", Hearing Time: " + $(tds[5]).text() +
        ", Hearing Time: " + $(tds[6]).text();
    var a = document.createElement('a');
    a.download = 'scheduler.ics';
    a.href = makeIcsFile(eventDate, summary, description);
    a.click();

    $('.toast-body').text("Downloaded sucessuflly!");
    $('.toast').toast({ animation: true, delay: 2000 });
    $('.toast').toast('show');
    /*
    var test =
        "BEGIN:VCALENDAR\n" +
        "CALSCALE:GREGORIAN\n" +
        "METHOD:PUBLISH\n" +
        "PRODID:-//Test Cal//EN\n" +
        "VERSION:2.0\n" +
        //
        "BEGIN: VEVENT\n" + 
        "CREATED: 20151219T021727Z\n" + 
        "DTEND; TZID=America/Toronto:20170515T110000\n" + 
        "DTSTAMP: 20151219T022251Z\n" + 
        "DTSTART; TZID=America/Toronto:20170515T100000\n" + 
        "EXDATE; TZID=America/Toronto:20170516T100000\n" + 
        "EXDATE; TZID=America/Toronto:20170517T100000\n" + 
        "LAST - MODIFIED: 20151219T022251Z\n" + 
        "RRULE: FREQ = DAILY; UNTIL = 20170519T035959Z\n" + 
        "SEQUENCE: 0\n" + 
        "SUMMARY: Meeting\n" + 
        "TRANSP: OPAQUE\n" + 
        "UID: 21B97459-D97B-4B23-AF2A-E2759745C299\n" + 
        "END: VEVENT\n" + 
        //
        "BEGIN: VEVENT\n" + 
        "CREATED: " + convertDate(new Date()) + "\n" +
        "DTEND; TZID=America/Toronto:" + 
        customConvertDate($(tds[4]).text()) + "T" +
        customConvertTime($(tds[5]).text()) + "\n" +
        "DTSTAMP: 20151219T022251Z\n" + 
        "DTSTART; TZID = America/Toronto:" +
        customConvertDate($(tds[4]).text()) + "T" + 
        customConvertTime($(tds[5]).text()) + "\n" +
        "LAST-MODIFIED: " + convertDate(new Date()) + "\n" +
        "RECURRENCE-ID; TZID=America/Toronto:20170518T100000\n" + 
        "SEQUENCE: 0\n" + 
        "SUMMARY:CourtCaseNo: " + $(tds[1]).text() + "\n" + 
        "DESCRIPTION:" + $(tds[2]).text() + "\n" +
        "TRANSP: OPAQUE\n" + 
        "UID: 21B97459-D97B-4B23-AF2A-E2759745C299\n" + 
        "END: VEVENT\n" +
        //
        "END: VCALENDAR";
    var data = new File([test], { type: "text/calendar" });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (icsFile !== null) {
        window.URL.revokeObjectURL(icsFile);
    }
    a.download = 'details.ics';
    a.href = window.URL.createObjectURL(data);
    a.click();
    */
    return;
}
function convertDate(date) {
    var event = new Date(date).toISOString();
    event = event.split("T")[0];
    event = event.split("-");
    event = event.join("");
    return event;
}

function customConvertDate(date) {
    var event = date;
    event = event.split("-");
    event = event.join("");
    return event;
}

function customConvertTime(time) {
    var event = time;
    event = event.split(":");
    event = event.join("");
    event = event + "00";
    return event;
}
function makeIcsFile(date, summary, description) {
    var test =
        "BEGIN:VCALENDAR\n" +
        "CALSCALE:GREGORIAN\n" +
        "METHOD:PUBLISH\n" +
        "PRODID:-//Test Cal//EN\n" +
        "VERSION:2.0\n" +
        "BEGIN:VEVENT\n" +
        "UID:21B97459-D97B-4B23-AF2A-E2759745C299\n" +
        "SUMMARY:" +
        summary +
        "\n" +
        "DESCRIPTION:" +
        description +
        "\n" +
        "DTSTART;VALUE=DATE:" +
        customConvertDate(date.start.day) + "T" + customConvertTime(date.start.time) + 
        "\n" +
        "DTEND;VALUE=DATE:" +
        customConvertDate(date.end.day) + "T" + customConvertTime(date.end.time)
        "\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR"; alert(test)
    var data = new File([test], { type: "text/calendar" });
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (icsFile !== null) {
        window.URL.revokeObjectURL(icsFile);
    }

    icsFile = window.URL.createObjectURL(data);
    
    return icsFile;
}
