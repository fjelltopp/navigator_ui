# Install dependencies only when needed
FROM node:lts-buster-slim as builder
WORKDIR /app
ARG NEXT_PUBLIC_API_BASE_URL=https://navigator.fjelltopp.org/api
ARG NODE_ENV=development
ARG NEXT_TELEMETRY_DISABLED=1
COPY . .

RUN yarn

CMD ["yarn", "dev"]


