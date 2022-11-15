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
    var description = "Jurisdiction:" + $(tds[2]).text() + "\nHearing Time is " + $(tds[5]).text();
    var a = document.createElement('a');
    a.download = 'scheduler.ics';
    a.href = makeIcsFile(eventDate, summary, description);
    a.click();
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
    var data = new File([test], { type: "text/plain" });
    // console.log(test)
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
