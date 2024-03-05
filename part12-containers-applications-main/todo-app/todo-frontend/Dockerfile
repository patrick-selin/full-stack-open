# frontti

FROM node:16 AS build-stage
WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:3001
ENV WATCHPACK_POLLING=true

RUN npm ci --only=production

# Add a new build stage for testing
FROM build-stage AS test-stage
RUN CI=true npm test

RUN npm run build

RUN npm install -g serve
CMD ["serve", "build"]