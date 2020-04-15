const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {
   win = new BrowserWindow({width: 1200, height: 1000, webPreferences: {
            nodeIntegration: true
        }})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'views/index.html'),
      protocol: 'file:',
      slashes: true
   }))
   win.webContents.openDevTools();
}

app.on('ready', createWindow)
