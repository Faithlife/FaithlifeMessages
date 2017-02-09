// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import url from 'url';
import { app, Menu } from 'electron';
import os from 'os';
import { getTemplate } from './menu/menu_template';
import createWindow from './helpers/window';
import { autoUpdater } from 'electron-auto-updater';
import log from 'electron-log'

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;
var macCloseHandler;

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
    var userDataPath = app.getPath('userData');
    app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

app.on('ready', function () {
    log.transports.file.level = 'info';
    log.info('Starting up');
    Menu.setApplicationMenu(Menu.buildFromTemplate(getTemplate(app)));
    mainWindow = createWindow('main', {
        width: 1200,
        height: 800
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true
    }));

    if (process.platform === 'darwin') {
        macCloseHandler = mainWindow.on('close', (e) => {
            log.info("Aborting close.");
            e.preventDefault();
            mainWindow.hide();
        });
    }

    if (env.name === 'development') {
        mainWindow.openDevTools();
    } else {
        autoUpdater.checkForUpdates();

        autoUpdater.on('error', (err) => {
            log.info(err);
        });
        autoUpdater.on('checking-for-update', () => {
            log.info('checking-for-update');
        });
        autoUpdater.on('update-available', () => {
            log.info('update-available');
        });
        autoUpdater.on('update-not-available', () => {
            log.info('update-not-available');
        });
        autoUpdater.on('update-downloaded', () => {
            // If an update already downloaded, install it now
            log.info("update-downloaded");
            mainWindow.removeEventListener('close', macCloseHandler);
            autoUpdater.quitAndInstall();
        })
    }
});

app.on('activate', () => mainWindow.show());

app.on('before-quit', () => {
    mainWindow.removeEventListener('close', macCloseHandler);
});

app.on('window-all-closed', app.quit);
