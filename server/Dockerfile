FROM node:14-alpine

WORKDIR /app

#Copy and install node dependencies
COPY package-lock.json .
COPY package.json .
RUN npm install

#Install FFMPEG
RUN apk add --no-cache ffmpeg

#Copy code
COPY . .

#Export port and run our start command
EXPOSE 3000
CMD [ "npm", "start" ]