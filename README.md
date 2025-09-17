# TBD Product Name

Welcome to the TDB Name! This web application helps development teams track their GitHub PRs clearly and customizably.

## Tech stack

TDB

## Repo Structure

```txt
root/
├── docs/
├── README.md
├── docker-compose.yaml
├── package-lock.json
├── package.json
├── .env
├── configs/
├── scripts/
└── apps/
    ├── client/
    │   ├── Dockerfile
    │   ├── eslint.config.js
    |   ├── package.json
    │   ├── .env
    │   └── src/
    │       └── main.tsx
    └── server/
        ├── Dockerfile
        ├── eslint.config.js
        ├── package.json
        ├── .env
        └── src/
            └── server.ts
```

## Dev setup

1. Specify env vars for root and each workspace as referenced in `.env.example`
2. Change your local repo's git directory

   ```sh
   # from the root of the repo
   git config core.hooksPath .githooks
   ```

3. spin up dev containers through compose

   ```sh
   # from the root of the repo
   docker compose up --build -d
   docker compose logs -f
   ```

   - if you only need 1 workspace, you can spin its related container instead

     ```sh
     # spins only the backend's container, named `server` in the compose file
     docker compose up --build -d server
     docker compose logs -f server
     ```

4. stop the containers when done

   ```sh
   # from the root of the repo once again
   docker compose down -v
   ```

## Deployment URLS

1. Frontend Netlify Deployment : <https://v57-tier3-team-32.netlify.app/>
2. Backend Render Deployment: <https://v57-tier3-team-32.onrender.com/>

## Team Documents and Channels

[Meetings & Decisions](https://discord.com/channels/330284646283608064/1411707782763380788/threads/1412889569082216518)

[Standup](https://discord.com/channels/330284646283608064/1411707782763380788/threads/1412451269838110751)

## Our Team

Everyone on your team should add their name along with a link to their GitHub
& optionally their LinkedIn profiles below. Do this in Sprint #1 to validate
your repo access and to practice PR'ing with your team _before_ you start
coding!

- Acto: [GitHub](https://github.com/acto-acto) / [LinkedIn](https://www.linkedin.com/in/thankgod-obobo-66ba28271/)
- Nadeem: [GitHub](https://github.com/707)
- snowbytes: [Github](https://github.com/snowbytes)
- devim: [GitHub](https://github.com/devimalka) / [LinkedIn](https://linkedin.com/in/oshada-kularathne/)
- BettyC: [GitHub](https://github.com/BettyC2002) / [LinkedIn](https://www.linkedin.com/in/bethrand-patience-131544333)
- theDevGuy578: [GitHub](https://github.com/LMgit91)
