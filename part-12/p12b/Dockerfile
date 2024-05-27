FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

ENV DEBUG=p12b:* 

USER node
CMD npm start

