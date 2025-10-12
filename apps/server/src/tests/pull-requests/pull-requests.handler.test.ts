import { test, describe, beforeEach, afterEach, mock, before } from "node:test";
import assert from "node:assert";
import axios from "axios";
import type { Request, Response } from "express";

let getAllPullRequests: typeof import("../../handlers/pull-requests.handler.js").getAllPullRequests;

before(async () => {
  process.env.FRONTEND_URL = "https://example.com";
  process.env.PORT = "1025";
  process.env.GITHUB_API_TOKEN = "testing this";

  ({ getAllPullRequests } = await import(
    "../../handlers/pull-requests.handler.js"
  ));
});

describe("Pull Requests Handler", () => {
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
      json: jsonMock,
    };
  });

  afterEach(() => {
    mock.restoreAll();
  });

  test("should return 200 with pull requests when all parameters are valid", async () => {
    mockReq = {
      query: { owner: "testowner", repo: "testrepo" },
    };

    const mockPullRequests = {
      data: [
        {
          number: 1,
          title: "Test PR 1",
          html_url: "https://example.com/test-pr-1",
          user: { login: "user1" },
          created_at: "2024-01-01T00:00:00Z",
          requested_reviewers: [{ login: "reviewer1" }, { login: "reviewer2" }],
          merged_at: null,
          state: "open",
          updated_at: "2024-01-02T00:00:00Z",
        },
        {
          number: 2,
          title: "Test PR 2",
          html_url: "https://example.com/test-pr-2",
          user: { login: "user2" },
          created_at: "2024-01-03T00:00:00Z",
          requested_reviewers: [],
          merged_at: "2024-01-04T00:00:00Z",
          state: "closed",
          updated_at: "2024-01-04T00:00:00Z",
        },
      ],
    };

    const expected = {
      repo: "testowner/testrepo",
      pullRequests: [
        {
          prNumber: 1,
          title: "Test PR 1",
          url: "https://example.com/test-pr-1",
          creator: "user1",
          creationTimestamp: "2024-01-01T00:00:00Z",
          requestedReviewers: ["reviewer1", "reviewer2"],
          lastActionType: "open",
          lastActionTimestamp: "2024-01-02T00:00:00Z",
        },
        {
          prNumber: 2,
          title: "Test PR 2",
          url: "https://example.com/test-pr-2",
          creator: "user2",
          creationTimestamp: "2024-01-03T00:00:00Z",
          requestedReviewers: [],
          lastActionType: "merged",
          lastActionTimestamp: "2024-01-04T00:00:00Z",
        },
      ],
    };

    mock.method(axios, "get", () => Promise.resolve(mockPullRequests));

    await getAllPullRequests(mockReq as Request, mockRes as Response);

    assert.strictEqual(statusMock.mock.callCount(), 1);
    assert.deepStrictEqual(statusMock.mock.calls[0].arguments, [200]);
    assert.strictEqual(jsonMock.mock.callCount(), 1);
    assert.deepStrictEqual(jsonMock.mock.calls[0].arguments, [expected]);
  });

  test("should return 500 when service throws an error", async () => {
    mockReq = {
      query: { owner: "testowner", repo: "testrepo" },
    };

    mock.method(axios, "get", () => Promise.reject(new Error("Network error")));

    await getAllPullRequests(mockReq as Request, mockRes as Response);

    assert.strictEqual(statusMock.mock.callCount(), 1);
    assert.deepStrictEqual(statusMock.mock.calls[0].arguments, [500]);
    assert.strictEqual(jsonMock.mock.callCount(), 1);
    assert.deepStrictEqual(jsonMock.mock.calls[0].arguments, [
      { error: "Internal server error." },
    ]);
  });
});
