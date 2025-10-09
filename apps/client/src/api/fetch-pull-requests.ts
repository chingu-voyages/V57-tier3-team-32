const { VITE_BACKEND_URL: BASE_URL } = import.meta.env;
if (BASE_URL == undefined) {
  throw new Error("BASE_URL not set");
}

export async function fetchPullRequests() {
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(
      // @todo improve on this, it shouldn't be hardcoded.
      `${BASE_URL}/api/v1/pull-requests?owner=chingu-voyages&repo=V57-tier3-team-32`,
      options,
    );
    const data = (await response.json()) as Record<string, string>;

    return { status: response.status, data };
  } catch (err) {
    console.error("An unexpected error happened", err);
    throw err;
  }
}
