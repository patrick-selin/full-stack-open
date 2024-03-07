# blog-app BACK PRODUCTION

FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production
RUN npm uninstall bcrypt
# RUN npm install bcryptjs
RUN npm install bcrypt --build-from-source

ENV NODE_ENV=development

USER node

CMD ["npm", "start"]