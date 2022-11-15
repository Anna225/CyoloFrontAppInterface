// thanks to https://jsfiddle.net/UselessCode/qm5AG/ as a starting point
(function () {
    // Some code for initialization on page load here.
})();

var icsFile = null;
function downloadCourtCase(elem, id) {
    var tr = $(elem).parent().parent();
    var tds = $(tr).find("td");
    var eventDate = {
        start: new Date(),
        end: new Date()
    }
    var summary = $(tds[1]).html();
    var description = "Jurisdiction:" + $(tds[2]).text() + ", Hearing Time is " + $(tds[5]).text();
    var a = document.createElement('a');
    a.download = 'scheduler.ics';
    a.href = makeIcsFile(eventDate, summary, description);
    a.click();

    $('.toast-body').text("Downloaded sucessuflly!");
    $('.toast').toast({ animation: true, delay: 2000 });
    $('.toast').toast('show');

    var test =
        "BEGIN:VCALENDAR\n" +
        "CALSCALE:GREGORIAN\n" +
        "METHOD:PUBLISH\n" +
        "PRODID:-//Test Cal//EN\n" +
        "VERSION:2.0\n" +
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
        "BEGIN: VEVENT\n" + 
        "CREATED: 20151219T022011Z\n" + 
        "DTEND; TZID=America/Toronto:20170518T120000\n" + 
        "DTSTAMP: 20151219T022251Z\n" + 
        "DTSTART; TZID = America/Toronto:20170518T110000\n" + 
        "LAST-MODIFIED: 20151219T022011Z\n" + 
        "RECURRENCE-ID; TZID=America/Toronto:20170518T100000\n" + 
        "SEQUENCE: 0\n" + 
        "SUMMARY:Final Meeting\n" + 
        "TRANSP: OPAQUE\n" + 
        "UID: 21B97459-D97B-4B23-AF2A-E2759745C299\n" + 
        "END: VEVENT\n" + 
        "END: VCALENDAR";
    var data = new File([test], { type: "text/calendar" });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (icsFile !== null) {
        window.URL.revokeObjectURL(icsFile);
    }

    a.href = window.URL.createObjectURL(data);
    a.click();
    return;

}
function convertDate(date) {
    var event = new Date(date).toISOString();
    event = event.split("T")[0];
    event = event.split("-");
    event = event.join("");
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
        "UID:test-1\n" +
        "DTSTART;VALUE=DATE:" +
        convertDate(date.start) +
        "\n" +
        "DTEND;VALUE=DATE:" +
        convertDate(date.end) +
        "\n" +
        "SUMMARY:" +
        summary +
        "\n" +
        "DESCRIPTION:" +
        description +
        "\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR";
    var data = new File([test], { type: "text/calendar" });
    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (icsFile !== null) {
        window.URL.revokeObjectURL(icsFile);
    }

    icsFile = window.URL.createObjectURL(data);
    
    return icsFile;
}
//var create = document.getElementById("create");
//create.addEventListener("click", createFile, false);
