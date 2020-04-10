import { app, BrowserWindow, Menu, Tray, nativeImage, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;
let tray: Tray = null;

const args = process.argv.slice(1),
    serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
  // Create the browser window.
  app.dock.hide();
  const display = screen.getPrimaryDisplay();
  const width = display.bounds.width;
  win = new BrowserWindow({
    x: width - 570,
    y: 0,
    height: 500,
    width: 570,
    transparent: true,
    frame: false,
    webPreferences: {
      webviewTag: true,
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  win.setMenuBarVisibility(false);
  win.setIgnoreMouseEvents(false);
  win.setAlwaysOnTop(true, 'floating');
  win.setVisibleOnAllWorkspaces(true);
  win.setFullScreenable(false);

  app.dock.show();


  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
    tray = null
  });

  return win;
}


function createTray(): void {
  let imagePath = path.join(__dirname, 'dist/assets/settingsTemplate.png');
  let appIcon = nativeImage.createFromPath(imagePath);
  tray = new Tray(appIcon);
  console.log(tray);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Ignore Mouse Events',
      submenu: [
        {
          label: 'No',
          type: 'radio',
          checked: true,
          click: () =>  win.setIgnoreMouseEvents(false)
        },
        {
          label: 'Yes', 
          type: 'radio',
          click: () => win.setIgnoreMouseEvents(true)
        }
      ]
    }, 
    {
      label: 'Close',
      click: () => {app.quit()}
    }
  ])
  tray.setContextMenu(contextMenu);
}


try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createTray();
    createWindow();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
