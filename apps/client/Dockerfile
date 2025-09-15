# escape=`
# oldest supported node version for `@vitejs/plugin-react@5.0.0`
FROM node:20.19.0-alpine AS base
WORKDIR /home/node/app/

# defined as additional_context
COPY --from=monorepo-root package*.json .npmrc ./
COPY package.json apps/client/
RUN npm ci --workspace=@pr-viewer/client

FROM base AS build
WORKDIR /home/node/app/

COPY ./ apps/client/
RUN npm run client:build

FROM nginx:alpine AS prod
RUN chown -R nginx:nginx /var/cache/nginx/ /var/run/
USER nginx:nginx

COPY --chown=nginx:nginx --from=build /home/node/app/apps/client/dist/ /usr/share/nginx/html/
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
