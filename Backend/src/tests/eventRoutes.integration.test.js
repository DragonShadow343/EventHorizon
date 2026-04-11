import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../server.js';
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

describe('Event route integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_ACCESS_SECRET = 'access-secret';
  });

  function authHeader(user = { id: 'user-1', role: 'user' }) {
    const token = jwt.sign(user, process.env.JWT_ACCESS_SECRET);
    return `Bearer ${token}`;
  }

  test('POST /events blocks unauthenticated requests', async () => {
    const response = await request(app).post('/events').field('title', 'Tech Meetup');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Missing token' });
  });

  test('POST /events returns 400 when required fields are missing', async () => {
    const response = await request(app)
      .post('/events')
      .set('Authorization', authHeader())
      .field('title', 'Tech Meetup')
      .field('description', 'A great event');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Missing required event fields' });
  });

  test('POST /events/:id/rsvp adds a valid RSVP', async () => {
    const save = jest.fn().mockResolvedValue();
    Event.findById.mockResolvedValue({
      rsvp: [],
      capacity: 10,
      save,
    });

    const response = await request(app)
      .post('/events/event-1/rsvp')
      .set('Authorization', authHeader());

    expect(response.status).toBe(200);
    expect(save).toHaveBeenCalled();
    expect(response.body.message).toBe('RSVP successful');
  });

  test('POST /events/:id/review rejects non-attendees', async () => {
    Event.findById.mockResolvedValue({
      rsvp: ['other-user'],
      reviews: [],
    });

    const response = await request(app)
      .post('/events/event-1/review')
      .set('Authorization', authHeader())
      .send({ rating: 5, comment: 'Amazing', userName: 'Jordan' });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ error: 'You must attend the event to review it' });
  });
});
