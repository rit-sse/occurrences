module.exports = {
  FeaturedEvent: function(committeeId) {
    this.name = 'Event Name 1';
    this.start_date = new Date(2014, 3, 21, 12, 30);
    this.end_date = new Date(2014, 3, 21, 13, 30);
    this.description = 'This is an event description';
    this.location = 'The SSE Lab';
    this.short_name = 'event 1';
    this.short_description = 'Cool short description which is longer than the regular description';
    this.image = 'path/to/image';
    this.featured = true;
    this.recurrence = 'well i will deal with this later';
    this.committee = committeeId;
  },

  UnfeaturedEvent: function(committeeId) {
    this.name = 'Event Name 2';
    this.start_date = new Date(2014, 3, 21, 12, 30);
    this.end_date = new Date(2014, 3, 21, 13, 30);
    this.description = 'This is an event description';
    this.location = 'The SSE Lab';
    this.short_name = 'event';
    this.featured = false;
    this.recurrence = 'well i will deal with this late';
    this.committee = committeeId;
  }
}
