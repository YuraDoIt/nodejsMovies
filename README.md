# This is test task made by Yurii Tsudzenko
Contact yura9989@gmail.com

This task use Docker, express.js
You should have installed Docker on you machine 
To run this project just simply run command below:
- npm install
- npm run server


```bash
docker build -t test-app-image .
```
```bash
docker run -d -p 8000:8050 -e APP_PORT=8050 --name test-app test-app-image
```

## Authors

- [@yuraTs](https://www.linkedin.com/in/yura-tsudzenko-417561173/)