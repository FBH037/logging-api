
FROM node:argon

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app


# replace this with your application's default port
EXPOSE 3030

CMD [ "npm", "start" ]

# RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
#
# RUN  apt-get -y update && apt-get install -y fortunes
#
# CMD /usr/games/fortune -a | cowsay
