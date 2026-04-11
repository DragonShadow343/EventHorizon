import { requireEventOwner } from '../middleware/eventOwnerMiddleware.js';
import Event from '../models/Event.js';

jest.mock('../models/Event.js', () => ({
  __esModule: true,
  default: {
    findById: jest.fn(),
  },
}));

describe('requireEventOwner', () => {
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('blocks users who do not own the event', async () => {
    Event.findById.mockResolvedValue({ organizerId: { toString: () => 'owner-id' } });
    const req = { params: { id: 'event-1' }, user: { id: 'other-user' } };

    await requireEventOwner(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not your event' });
    expect(next).not.toHaveBeenCalled();
  });

  test('calls next when the user owns the event', async () => {
    const event = { organizerId: { toString: () => 'owner-id' } };
    Event.findById.mockResolvedValue(event);
    const req = { params: { id: 'event-1' }, user: { id: 'owner-id' } };

    await requireEventOwner(req, res, next);

    expect(req.event).toBe(event);
    expect(next).toHaveBeenCalled();
  });
});
