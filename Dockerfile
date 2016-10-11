
FROM node:argon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/


COPY . /usr/src/app

EXPOSE 3000

# CMD ["nodemon", "--legacy-watch", "/usr/src/app/server.js" ]
CMD [ "npm", "start" ]

# RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
