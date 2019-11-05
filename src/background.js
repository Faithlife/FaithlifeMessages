import { Menu, app, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import createWindow from './helpers/window';
import env from './env';
import { getTemplate } from './menu/menu_template';
import log from 'electron-log';
import path from 'path';

let mainWindow;
let macCloseHandler = e => {
	log.info('Aborting close.');
	e.preventDefault();
	mainWindow.hide();
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
	const userDataPath = app.getPath('userData');
	app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

ipcMain.on('notification-shim', () => {
	if (!mainWindow.isFocused()) {
		mainWindow.flashFrame(true);
	}
});

app.setAppUserModelId('com.faithlife.electron-messages');

if (!app.requestSingleInstanceLock()) {
	app.quit();
} else {
	app.on('second-instance', () => {
		if (mainWindow) {
			if (mainWindow.isMinimized()) {
				mainWindow.restore();
			}

			mainWindow.focus();
		}
	});

	app.on('ready', function() {
		log.transports.file.level = 'info';
		log.info('Starting up');
		Menu.setApplicationMenu(Menu.buildFromTemplate(getTemplate(app)));
		mainWindow = createWindow('main', {
			width: 1200,
			height: 800,
			webPreferences: {
				preload: path.join(__dirname, 'preload.js'),
				enableRemoteModule: false,
			},
		});

		mainWindow.loadURL('https://beta.faithlife.com/signin?returnUrl=/messages?view=partial');

		if (process.platform === 'darwin') {
			mainWindow.on('close', macCloseHandler);
		}

		mainWindow.on('focus', () => mainWindow.flashFrame(false));

		mainWindow.webContents.on('new-window', (event, url) => {
			event.preventDefault();
			shell.openExternal(url);
		});

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
}
