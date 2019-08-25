FROM nginx:alpine

WORKDIR /usr/src/app

COPY . .

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN apk add npm
RUN npm install
RUN apk update
RUN apk add bash

RUN ["chmod", "+x", "/usr/src/app/run"]

CMD ["/usr/src/app/run"]