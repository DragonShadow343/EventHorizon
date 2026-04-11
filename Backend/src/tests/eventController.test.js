import {
  createEvent,
  rsvpToEvent,
  submitEventReview,
  searchEvents,
} from '../controllers/eventController.js';
import Event from '../models/Event.js';

jest.mock('../models/Event.js', () => ({
  __esModule: true,
  default: Object.assign(jest.fn(), {
    find: jest.fn(),
    findById: jest.fn(),
  }),
}));

jest.mock('../models/Report.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('eventController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {}, user: { id: 'user-1' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  test('createEvent rejects requests with missing required fields', async () => {
    req.body = { title: 'Hackathon' };

    await createEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Missing required event fields' });
  });

  test('rsvpToEvent prevents duplicate RSVPs', async () => {
    req.params.id = 'event-1';
    Event.findById.mockResolvedValue({
      rsvp: ['user-1'],
      capacity: 50,
    });

    await rsvpToEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Already RSVP'd" });
  });

  test('submitEventReview blocks users who did not RSVP', async () => {
    req.params.id = 'event-2';
    req.body = { rating: 5, comment: 'Great!', userName: 'Jordan' };
    Event.findById.mockResolvedValue({
      rsvp: ['someone-else'],
      reviews: [],
    });

    await submitEventReview(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'You must attend the event to review it' });
  });

  test('searchEvents returns all events when no query is provided', async () => {
    const events = [{ title: 'Tech Meetup' }, { title: 'Art Fair' }];
    Event.find.mockResolvedValue(events);

    await searchEvents(req, res);

    expect(Event.find).toHaveBeenCalledWith();
    expect(res.json).toHaveBeenCalledWith(events);
  });

  test('searchEvents performs a regex search when q is present', async () => {
    req.query.q = 'tech';
    const events = [{ title: 'Tech Meetup' }];
    Event.find.mockResolvedValue(events);

    await searchEvents(req, res);

    expect(Event.find).toHaveBeenCalledWith({
      $or: [
        { title: { $regex: 'tech', $options: 'i' } },
        { description: { $regex: 'tech', $options: 'i' } },
      ],
    });
    expect(res.json).toHaveBeenCalledWith(events);
  });
});
