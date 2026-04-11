import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';

describe('tokenUtils', () => {
  beforeEach(() => {
    process.env.JWT_ACCESS_SECRET = 'access-secret';
    process.env.JWT_REFRESH_SECRET = 'refresh-secret';
  });

  test('generateAccessToken includes user id and role', () => {
    const token = generateAccessToken({ _id: 'abc123', role: 'admin' });
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    expect(decoded.id).toBe('abc123');
    expect(decoded.role).toBe('admin');
  });

  test('generateRefreshToken includes only the user id', () => {
    const token = generateRefreshToken({ _id: 'user-1' });
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    expect(decoded.id).toBe('user-1');
    expect(decoded.role).toBeUndefined();
  });
});
