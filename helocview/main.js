// main.js
const { app, BrowserWindow } = require('electron');
const remoteMain = require('@electron/remote/main');
const path = require('path');
// initialize @electron/remote in the main process
remoteMain.initialize();


function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 600,
    title: 'HelocView',
     icon: path.join(__dirname, 'assets', 'app-icon.ico'),
     frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  remoteMain.enable(win.webContents);
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // On macOS it’s common for apps to stay open until the user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // Re-create a window when dock icon is clicked and none are open (macOS)
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
