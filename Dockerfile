FROM node:16

#USER node:node

RUN mkdir -p /usr/home/app

WORKDIR /usr/home/app

COPY package.json .

RUN #npm install --omit=dev

EXPOSE 5000

#ENTRYPOINT ["node", "start"]
#CMD npm start
