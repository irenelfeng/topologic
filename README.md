#topologic

##INSTALL INSTRUCTIONS:
1. Install npm
2. `sudo npm install -g browserify`
3. `sudo npm install --save react react-dom babelify babel-preset-react`
4. `browserify -t [ babelify --presets [ react ] ] app/main.js -o bundle.js`
5. View application by browsing to app/index.html 
