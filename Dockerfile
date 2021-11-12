FROM node:14.16.1

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY --chown=node:node . .

USER node

RUN yarn install --pure-lockfile && cd client && yarn install --pure-lockfile && npm rebuild node-sass && yarn build && cd ..

EXPOSE 5000
