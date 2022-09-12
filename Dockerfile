FROM node:latest

WORKDIR /app
COPY package.json .
RUN npm install 

COPY . ./
ENV PORT=8050
EXPOSE $PORT

CMD ["node", "main.js"]