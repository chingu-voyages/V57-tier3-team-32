import { fetchAndNormalizePullRequests } from '../../services/pull-requests.service.js';
import { test, describe, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert';
import axios from 'axios';


describe('Pull Requests Service', () => {
  beforeEach(() => {
    mock.restoreAll();
  });

  afterEach(() => {
    mock.restoreAll();
  });

  test('should fetch and normalize pull requests successfully', async () => {
    const mockGitHubResponse = {
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

    const axiosGetMock = mock.method(axios, 'get', () => Promise.resolve(mockGitHubResponse));

    const result = await fetchAndNormalizePullRequests('testowner', 'testrepo', 'test-token');

    assert.strictEqual(axiosGetMock.mock.callCount(), 1);
    assert.ok(axiosGetMock.mock.calls[0], 'Expected axios.get to be called');
    assert.deepStrictEqual(axiosGetMock.mock.calls[0].arguments, [
      'https://api.github.com/repos/testowner/testrepo/pulls?state=all',
      {
        headers: {
          Authorization: 'token test-token',
          'Content-Type': 'application/json'
        }
      }
    ]);

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

    assert.deepStrictEqual(result, expected);
  });

  test('should throw error when axios request fails', async () => {
    mock.method(axios, 'get', () => Promise.reject(new Error('Network error')));

    await assert.rejects(
      () => fetchAndNormalizePullRequests('testowner', 'testrepo', 'test-token'),
      {
        name: 'Error',
        message: 'Failed to fetch pull requests from GitHub API.'
      }
    );
  });

  test('should handle empty response', async () => {
    const mockGitHubResponse = { data: [] };
    mock.method(axios, 'get', () => Promise.resolve(mockGitHubResponse));

    const result = await fetchAndNormalizePullRequests('testowner', 'testrepo', 'test-token');

    assert.deepStrictEqual(result, []);
  });
});