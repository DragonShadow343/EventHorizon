import jwt from 'jsonwebtoken';
import { authMiddleware } from '../middleware/authMiddleware.js';

describe('authMiddleware', () => {
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();

  beforeEach(() => {
    process.env.JWT_ACCESS_SECRET = 'access-secret';
    jest.clearAllMocks();
  });

  test('returns 401 when the token is missing', () => {
    const req = { headers: {} };

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing token' });
    expect(next).not.toHaveBeenCalled();
  });

  test('attaches the decoded user to the request for valid tokens', () => {
    const token = jwt.sign({ id: 'user-1', role: 'user' }, process.env.JWT_ACCESS_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };

    authMiddleware(req, res, next);

    expect(req.user).toMatchObject({ id: 'user-1', role: 'user' });
    expect(next).toHaveBeenCalled();
  });
});
