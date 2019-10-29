// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { Menu, app } from 'electron';

import { autoUpdater } from 'electron-updater';
import createWindow from './helpers/window';
import env from './env';
import { getTemplate } from './menu/menu_template';
import log from 'electron-log';
import os from 'os';
import path from 'path';
import url from 'url';

var mainWindow;
var macCloseHandler = e => {
	log.info('Aborting close.');
	e.preventDefault();
	mainWindow.hide();
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
	var userDataPath = app.getPath('userData');
	app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

app.setAppUserModelId('com.faithlife.electron-messages');

app.on('ready', function() {
	log.transports.file.level = 'info';
	log.info('Starting up');
	Menu.setApplicationMenu(Menu.buildFromTemplate(getTemplate(app)));
	mainWindow = createWindow('main', {
		width: 1200,
		height: 800,
		webPreferences: {
			webviewTag: true,
			nodeIntegration: true,
		},
	});

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'app.html'),
			protocol: 'file:',
			slashes: true,
		}),
	);

	if (process.platform === 'darwin') {
		mainWindow.on('close', macCloseHandler);
	}

	if (env.name === 'development') {
		mainWindow.openDevTools();
	} else {
		autoUpdater.checkForUpdates();

		autoUpdater.on('error', err => {
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
			log.info('update-downloaded');
			mainWindow.removeListener('close', macCloseHandler);
			autoUpdater.quitAndInstall();
		});
	}
});

app.on('activate', () => {
	if (mainWindow) {
		mainWindow.show();
	}
});

app.on('before-quit', () => {
	mainWindow.removeListener('close', macCloseHandler);
});

app.on('window-all-closed', app.quit);
