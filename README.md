# PR Status Board

Welcome to the PR Status Board! This web application tracks current PRs waiting for review as well as the history of PRs completed by the team.

## Deployment URLS

1. Frontend Netlify Deployment : <https://v57-tier3-team-32.netlify.app/>
2. Backend Render Deployment: <https://v57-tier3-team-32-x1uz.onrender.com/>

## Teamwork and Collaboration

- Project management: [Github Projects board](https://github.com/orgs/chingu-voyages/projects/345)
- Design: [Figma board](https://www.figma.com/design/EbrFV2CPqlYTueDK58Gvjg/CHINGU-PR?node-id=0-1&t=wHszc2e9gMmnAhXt-1)
- Team Agreements, Workflow, Standards: [Github Wiki Article](https://github.com/chingu-voyages/V57-tier3-team-32/wiki/Team-workflow,-agreements-&-standards)
- Initial Product requirements: [Github Wiki Article](https://github.com/chingu-voyages/V57-tier3-team-32/wiki/PRD)
- Brainstorming and Retrospectives: [Miro Board](https://miro.com/app/board/uXjVJJfewSU=/)

## Tech stack

- **Languages**: [Typescript](https://www.typescriptlang.org)
- **Frontend**: [React](https://react.dev/), [Shadcn/UI](https://ui.shadcn.com/), [Tailwind](https://tailwindcss.com).
- **Backend**: [Node.js](https://nodejs.org), [Express.js](https://expressjs.com/)
- **Infra**: [Docker](https://www.docker.com), [Github Actions](https://github.com/features/actions)

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

## Our Team

- Acto: [GitHub](https://github.com/acto-acto) / [LinkedIn](https://www.linkedin.com/in/thankgod-obobo-66ba28271/)
- Alexander: [GitHub](https://github.com/reckless)
- BettyC: [GitHub](https://github.com/BettyC2002) / [LinkedIn](https://www.linkedin.com/in/bethrand-patience-131544333)
- devim: [GitHub](https://github.com/devimalka) / [LinkedIn](https://linkedin.com/in/oshada-kularathne/)
- Nadeem: [GitHub](https://github.com/707)
- snowbytes: [Github](https://github.com/snowbytes)
- theDevGuy578: [GitHub](https://github.com/LMgit91)
