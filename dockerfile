FROM node:14.2.0
WORKDIR /usr/app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "run", "start-linux"]