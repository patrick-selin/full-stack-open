# blog-app backend

FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

ENV NODE_ENV=development

EXPOSE 3003

USER node

CMD ["npm", "run", "dev"]
