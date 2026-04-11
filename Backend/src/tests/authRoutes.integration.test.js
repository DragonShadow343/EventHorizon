import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../server.js';
import User from '../models/User.js';
import * as tokenUtils from '../utils/tokenUtils.js';

jest.mock('../models/User.js', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  },
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock('../utils/tokenUtils.js', () => ({
  generateAccessToken: jest.fn(),
  generateRefreshToken: jest.fn(),
}));

describe('Auth route integration tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_ACCESS_SECRET = 'access-secret';
  });

  test('POST /auth/register creates a new user and returns 201', async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashed-password');
    User.create.mockResolvedValue({ _id: 'new-user-id' });

    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Jordan', email: 'jordan@test.com', password: 'Password1!' });

    expect(response.status).toBe(201);
    expect(User.create).toHaveBeenCalledWith({
      email: 'jordan@test.com',
      passwordHash: 'hashed-password',
      name: 'Jordan',
    });
    expect(response.body).toEqual({ message: 'Registered', userId: 'new-user-id' });
  });

  test('POST /auth/login returns user data, access token, and refresh cookie', async () => {
    User.findOne.mockResolvedValue({
      id: 'user-1',
      _id: 'user-1',
      role: 'user',
      name: 'Jordan',
      email: 'jordan@test.com',
      passwordHash: 'hashed-password',
    });
    bcrypt.compare.mockResolvedValue(true);
    tokenUtils.generateAccessToken.mockReturnValue('access-token');
    tokenUtils.generateRefreshToken.mockReturnValue('refresh-token');

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'jordan@test.com', password: 'Password1!' });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: 'Login successful',
      accessToken: 'access-token',
      user: {
        id: 'user-1',
        role: 'user',
        name: 'Jordan',
        email: 'jordan@test.com',
      },
    });
    expect(response.headers['set-cookie'][0]).toContain('refreshToken=refresh-token');
  });
});
