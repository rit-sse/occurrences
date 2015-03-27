function ical(events) {
  var arr = [];
  var gen = calendar(events);
  for(var line of gen) {
    arr.push(line);
  }
  return arr.join('\n');
}

function *calendar(events) {
  yield 'BEGIN:VCALENDAR';
  yield 'CALSCALE:GREGORIAN';
  yield* timezone();
  for(var ev of events) {
    yield* event(ev);
  }
  yield 'END:VCALENDAR';
}

function *timezone() {
  yield 'BEGIN:VTIMEZONE';
  yield 'TZID:America/New_York';
  yield 'X-LIC-LOCATION:America/New_York';
  yield 'BEGIN:DAYLIGHT';
  yield 'TZOFFSETFROM:-0500';
  yield 'TZOFFSETTO:-0400';
  yield 'TZNAME:EDT';
  yield 'DTSTART:19700308T020000';
  yield 'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU';
  yield 'END:DAYLIGHT';
  yield 'BEGIN:STANDARD';
  yield 'TZOFFSETFROM:-0400';
  yield 'TZOFFSETTO:-0500';
  yield 'TZNAME:EST';
  yield 'DTSTART:19701101T020000';
  yield 'RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU';
  yield 'END:STANDARD';
  yield 'END:VTIMEZONE';
}

function *event(ev) {
  yield 'BEGIN:VEVENT';
  yield 'DTEND;TZID=America/New_York;VALUE=DATE-TIME:' + ev.end_date_string();
  yield 'DTSTART;TZID=America/New_York;VALUE=DATE-TIME:' + ev.start_date_string();
  yield 'DESCRIPTION:' + ev.description;
  yield 'SUMMARY:' + ev.short_name;
  yield 'LOCATION:' + ev.location;
  if(ev.recurrence) {
    yield 'RRULE:' + ev.recurrence;
  }
  yield 'END:VEVENT';
}

module.exports = ical;
