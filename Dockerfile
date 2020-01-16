FROM node:latest
RUN apt-get update && apt-get install -y \
    vim
RUN mkdir -p /code
WORKDIR /code
COPY package.json /code
RUN npm install
COPY . /code
EXPOSE 5555
CMD [ "npm", "start" ]