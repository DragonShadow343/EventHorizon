import { createComment, deleteComment } from '../controllers/commentController.js';
import Comment from '../models/Comment.js';

jest.mock('../models/Comment.js', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    findById: jest.fn(),
  },
}));

describe('commentController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {}, params: {}, user: { id: 'user-1' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  test('createComment stores a top-level comment when parentId is omitted', async () => {
    const created = { _id: 'comment-1', text: 'Nice event' };
    req.params.eventId = 'event-1';
    req.body = { text: 'Nice event' };
    Comment.create.mockResolvedValue(created);

    await createComment(req, res);

    expect(Comment.create).toHaveBeenCalledWith({
      eventId: 'event-1',
      userId: 'user-1',
      text: 'Nice event',
      parentId: null,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });

  test('deleteComment rejects users who do not own the comment', async () => {
    req.params.commentId = 'comment-1';
    Comment.findById.mockResolvedValue({ userId: { toString: () => 'owner-id' } });

    await deleteComment(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });
});
