function csv(events) {
 return [{
    short_name: 'Short Name',
    committee: { name: 'Committee'},
    name: 'Name',
    start_date: 'Start',
    end_date: 'End'
  }]
    .concat(events)
    .map(function(ev){
      var arr = []
      for(var e of event(ev)) {
        arr.push(e);
      }
      return arr.join(',')
    })
    .join('\n');
}

function *event(ev) {
  yield ev.short_name;
  yield ev.committee.name;
  yield ev.name;
  yield ev.start_date;
  yield ev.end_date;
}

module.exports = csv;
