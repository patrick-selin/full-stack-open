# blog-app backend

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install
RUN npm install bcrypt --build-from-source

ENV NODE_ENV=development

USER node

CMD ["npm", "run", "dev"]