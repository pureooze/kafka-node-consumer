FROM node:8.10.0

SHELL ["/bin/bash", "-c"]

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN mkdir /opt/kafka
WORKDIR /opt/kafka
COPY app.js /opt/kafka
COPY .nvmrc /opt/kafka
COPY package.json /opt/kafka

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN ["/bin/bash", "-c", "yarn install --pure-lockfile"]

EXPOSE 3000 3001
ENTRYPOINT ["node", "app.js"]