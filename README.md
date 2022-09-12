#This is test task made by Yurii Tsudzenko

This task use Docker, express.js
You should have installed Docker on you machine 
To run this project just simply run command below:
- npm install
- npm run server


docker build -t test-app-image .

docker run -d -p 8000:8050 -e APP_PORT=8050 --name test-app test-app-image