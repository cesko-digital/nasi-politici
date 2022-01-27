FROM node:12.22.8
WORKDIR /user/src/app/

COPY package.json yarn.lock .
RUN yarn install

COPY --chown=node:node . .

RUN yarn run build

EXPOSE 5001
CMD ["yarn", "run", "start"]
