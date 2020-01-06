FROM node:12.14
WORKDIR /user/src/app/

COPY package.json package.json
RUN yarn install

COPY --chown=node:node . .

RUN yarn build

EXPOSE 5001

CMD ["npm", "start"]
