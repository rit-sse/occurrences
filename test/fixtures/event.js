module.exports = {
  featuredEvent: {
    name: 'Event Name 1',
    start_date: new Date(2014, 3, 21, 12, 30),
    end_date: new Date(2014, 3, 21, 13, 30),
    description: 'This is an event description',
    location: 'The SSE Lab',
    short_name: 'event 1',
    short_description: 'Cool short description which is longer than the regular description',
    image: 'path/to/image',
    featured: true,
    recurrence: 'well i will deal with this later'
  },

  unFeaturedEvent: {
    name: 'Event Name 2',
    start_date: new Date(2014, 3, 21, 12, 30),
    end_date: new Date(2014, 3, 21, 13, 30),
    description: 'This is an event description',
    location: 'The SSE Lab',
    short_name: 'event 1',
    featured: false,
    recurrence: 'well i will deal with this later'
  }
}
