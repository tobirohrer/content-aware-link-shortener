FROM nginx:alpine

WORKDIR /usr/src/app

COPY . .

RUN apk add npm
RUN npm install
RUN apk update
RUN apk add bash

RUN ["chmod", "+x", "/usr/src/app/run"]

CMD ["/usr/src/app/run"]