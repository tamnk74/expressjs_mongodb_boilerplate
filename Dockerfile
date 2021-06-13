FROM 14-alpine

RUN apk update && apk add bash && apk add python && apk add make && npm install -g loopback-cli && npm install -g nodemon && npm install -g node-pre-gyp

USER root

# Set default work directory
WORKDIR /var/www

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install && npm cache clean --force --loglevel=error

COPY . .

EXPOSE 3000