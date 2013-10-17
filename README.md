Running in development
=========
```
unzip app.zip
cd app/
gem install compass
npm install -g yo
npm install
bower install
npm start
```
This should start up a server on port 9000 and open a web browser to the app URL (http://localhost:9000/)


Testing the app
=========
```
grunt karma
```


Building the app for deployment
=========
```
grunt build
```
This will compile the app into ./dist/
