import { test, describe, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert';
import type { Request, Response } from 'express';
import { getAllPullRequests } from '../../handlers/pull-requests.handler.js';
import axios from 'axios';

const originalEnv = process.env;

describe('Pull Requests Handler', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let statusMock: any;
  let jsonMock: any;

  beforeEach(() => {
    mock.restoreAll();

    statusMock = mock.fn(() => mockRes);
    jsonMock = mock.fn();
    
    mockRes = {
      status: statusMock,
      json: jsonMock
    };

    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    mock.restoreAll();
  });

  test('should return 500 when GITHUB_API_TOKEN is missing', async () => {
    delete process.env.GITHUB_API_TOKEN;
    mockReq = {
      query: { owner: 'testowner', repo: 'testrepo' }
    };

    await getAllPullRequests(mockReq as Request, mockRes as Response);

    assert.strictEqual(statusMock.mock.callCount(), 1);
    assert.deepStrictEqual(statusMock.mock.calls[0].arguments, [500]);
    assert.strictEqual(jsonMock.mock.callCount(), 1);
    assert.deepStrictEqual(jsonMock.mock.calls[0].arguments, [{ error: 'Missing environment variables.' }]);
  });

  test('should return 500 when owner is missing', async () => {
    process.env.GITHUB_API_TOKEN = 'test-token';
    mockReq = {
      query: { repo: 'testrepo' }
    };

    await getAllPullRequests(mockReq as Request, mockRes as Response);

    assert.strictEqual(statusMock.mock.callCount(), 1);
    assert.deepStrictEqual(statusMock.mock.calls[0].arguments, [500]);
    assert.strictEqual(jsonMock.mock.callCount(), 1);
    assert.deepStrictEqual(jsonMock.mock.calls[0].arguments, [{ error: 'Missing environment variables.' }]);
  });

  test('should return 500 when repo is missing', async () => {
    process.env.GITHUB_API_TOKEN = 'test-token';
    mockReq = {
      query: { owner: 'testowner' }
    };

    await getAllPullRequests(mockReq as Request, mockRes as Response);

    assert.strictEqual(statusMock.mock.callCount(), 1);
    assert.deepStrictEqual(statusMock.mock.calls[0].arguments, [500]);
    assert.strictEqual(jsonMock.mock.callCount(), 1);
    assert.deepStrictEqual(jsonMock.mock.calls[0].arguments, [{ error: 'Missing environment variables.' }]);
  });

  test('should return 200 with pull requests when all parameters are valid', async () => {
    process.env.GITHUB_API_TOKEN = 'test-token';
    mockReq = {
      query: { owner: 'testowner', repo: 'testrepo' }
    };

    const mockPullRequests = {
      data: [
        {
          number: 1,
          title: 'Test PR 1',
          user: { login: 'user1' },
          created_at: '2024-01-01T00:00:00Z',
          requested_reviewers: [{ login: 'reviewer1' }, { login: 'reviewer2' }],
          merged_at: null,
          state: 'open',
          updated_at: '2024-01-02T00:00:00Z'
        },
        {
          number: 2,
          title: 'Test PR 2',
          user: { login: 'user2' },
          created_at: '2024-01-03T00:00:00Z',
          requested_reviewers: [],
          merged_at: '2024-01-04T00:00:00Z',
          state: 'closed',
          updated_at: '2024-01-04T00:00:00Z'
        }
      ]
    };

        const expected = [
      {
        prNumber: 1,
        title: 'Test PR 1',
        creator: 'user1',
        creationTimestamp: '2024-01-01T00:00:00Z',
        requestedReviewers: ['reviewer1', 'reviewer2'],
        lastActionType: 'open',
        lastActionTimestamp: '2024-01-02T00:00:00Z'
      },
      {
        prNumber: 2,
        title: 'Test PR 2',
        creator: 'user2',
        creationTimestamp: '2024-01-03T00:00:00Z',
        requestedReviewers: [],
        lastActionType: 'merged',
        lastActionTimestamp: '2024-01-04T00:00:00Z'
      }
    ];

    mock.method(axios, 'get', () => Promise.resolve(mockPullRequests));

    await getAllPullRequests(mockReq as Request, mockRes as Response);

    assert.strictEqual(statusMock.mock.callCount(), 1);
    assert.deepStrictEqual(statusMock.mock.calls[0].arguments, [200]);
    assert.strictEqual(jsonMock.mock.callCount(), 1);
    assert.deepStrictEqual(jsonMock.mock.calls[0].arguments, [expected]);
  });

  test('should return 500 when service throws an error', async () => {
    process.env.GITHUB_API_TOKEN = 'test-token';
    mockReq = {
      query: { owner: 'testowner', repo: 'testrepo' }
    };

    mock.method(axios, 'get', () => Promise.reject(new Error('Network error')));

    await getAllPullRequests(mockReq as Request, mockRes as Response);

    assert.strictEqual(statusMock.mock.callCount(), 1);
    assert.deepStrictEqual(statusMock.mock.calls[0].arguments, [500]);
    assert.strictEqual(jsonMock.mock.callCount(), 1);
    assert.deepStrictEqual(jsonMock.mock.calls[0].arguments, [{ error: 'Internal server error.' }]);
  });
});
