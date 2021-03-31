FROM node:14.16.0-alpine3.13

RUN mkdir -p $HOME/node_modules && chown -R node:node $HOME

WORKDIR $HOME

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE $PORT

CMD [ "npm", "start" ]
