Universal App
--
Universal app using:
* React JS (v0.14)
* Redux
* JSPM
* Server side/middleware TBD

Installation
--
As usual, just run `npm install`

If you need a web server, run `npm start` and point to [localhost:3005](http://localhost:3005)


My notes
--

```
jspm init .
jspm install react
jspm install redux=github:gaearon/redux@v1.0.0-rc
spm install react-dom
jspm resolve --only npm:core-js@1.0.1
jspm dl-loader
```