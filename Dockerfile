# Install dependencies only when needed
FROM node:lts-buster-slim as builder
WORKDIR /app
ARG NEXT_PUBLIC_CKAN_SITE_URL=https://adr.unaids.org
ARG NEXT_PUBLIC_API_BASE_URL=http://navigator.fjelltopp.org/middleware/api
ARG AUTH0_BASE_URL='http://navigator.minikube'
ARG AUTH0_ISSUER_BASE_URL='https://hivtools.eu.auth0.com'
ARG AUTH0_AUDIENCE='http://navigator.minikube'
ARG ARG NODE_ENV=development
ARG NEXT_TELEMETRY_DISABLED=1
ARG SENTRY_AUTH_TOKEN=fake_token
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn compile
RUN yarn build

CMD ["yarn", "start"]
