import { test, describe, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert';
import type { Request, Response } from 'express';
import { getAllPullRequests } from '../../handlers/pull-requests.handler.js';

const originalEnv = process.env;
// const pullRequestsService = await import('../../services/pull-requests.service.js');

describe('Pull Requests Handler', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let statusMock: any;
  let jsonMock: any;
  let fetchMock: any;

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

    const mockPullRequests = [
      {
        prNumber: 1,
        title: 'Test PR',
        creator: 'testuser',
        creationTimestamp: '2024-01-01T00:00:00Z',
        requestedReviewers: ['reviewer1'],
        lastActionType: 'open',
        lastActionTimestamp: '2024-01-01T00:00:00Z'
      }
    ];

    const fetchMock = mock.fn(() => Promise.resolve(mockPullRequests));
    mock.method(await import('../../services/pull-requests.service.js'), 'fetchAndNormalizePullRequests', fetchMock);

    await getAllPullRequests(mockReq as Request, mockRes as Response);

    assert.strictEqual(statusMock.mock.callCount(), 1);
    assert.deepStrictEqual(statusMock.mock.calls[0].arguments, [200]);
    assert.strictEqual(jsonMock.mock.callCount(), 1);
    assert.deepStrictEqual(jsonMock.mock.calls[0].arguments, [mockPullRequests]);
  });

  test('should return 500 when service throws an error', async () => {
    process.env.GITHUB_API_TOKEN = 'test-token';
    mockReq = {
      query: { owner: 'testowner', repo: 'testrepo' }
    };

    const fetchMock = mock.fn(() => Promise.reject(new Error('Service error')));
    mock.method(await import('../../services/pull-requests.service.js'), 'fetchAndNormalizePullRequests', fetchMock);

    await getAllPullRequests(mockReq as Request, mockRes as Response);

    assert.strictEqual(statusMock.mock.callCount(), 1);
    assert.deepStrictEqual(statusMock.mock.calls[0].arguments, [500]);
    assert.strictEqual(jsonMock.mock.callCount(), 1);
    assert.deepStrictEqual(jsonMock.mock.calls[0].arguments, [{ error: 'Internal server error.' }]);
  });
});
