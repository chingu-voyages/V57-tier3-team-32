# escape=`
# oldest supported node version for `node --watch`
FROM node:20.13.0-alpine AS base
WORKDIR /home/node/app/

# defined as additional_context
COPY --from=monorepo-root package*.json .npmrc ./
COPY package.json apps/server/
RUN npm ci --workspace=@pr-viewer/server

FROM base AS build
WORKDIR /home/node/app/

COPY ./ apps/server/
RUN npm run server:build

FROM node:20.13.0-alpine AS prod
USER node:node
WORKDIR /home/node/app/

ENV NODE_ENV=production

COPY --chown=node:node --from=monorepo-root package*.json .npmrc ./
COPY --chown=node:node package.json apps/server/
RUN npm ci --omit=dev --workspace=@pr-viewer/server

COPY --chown=node:node --from=build /home/node/app/apps/server/dist/ apps/server/dist/

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 `
  CMD curl -f http://localhost:${PORT}/health || exit 1

CMD ["node", "apps/server/dist/server.js"]
