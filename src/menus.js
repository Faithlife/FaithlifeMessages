import { Menu, MenuItem, clipboard } from 'electron';

export function createAppMenu(app, mainWindow, appSettings) {
	const appMenu = new Menu();

	// add MacOS app menu
	if (process.platform === 'darwin') {
		const quitMenuItem = new MenuItem({
			role: 'quit',
		});

		appMenu.append(
			new MenuItem({
				label: app.getName(),
				submenu: [quitMenuItem],
			}),
		);

		appMenu.append(
			new MenuItem({
				label: 'Edit',
				submenu: [
					{
						role: 'undo',
					},
					{
						role: 'redo',
					},
					{
						type: 'separator',
					},
					{
						role: 'cut',
					},
					{
						role: 'copy',
					},
					{
						role: 'paste',
					},
					{
						role: 'delete',
					},
					{
						role: 'selectall',
					},
				],
			}),
		);
	}

	appMenu.append(
		new MenuItem({
			label: 'Share',
			submenu: [
				new MenuItem({
					label: 'Copy location',
					accelerator: 'Ctrl + Alt + C',
					click: () => clipboard.writeText(mainWindow.webContents.getURL()),
				}),
			],
		}),
	);

	const groupMessagesPlaySoundMenuItem = new MenuItem({
		type: 'checkbox',
		label: 'Play sound',
		checked: appSettings.isGroupNotificationSoundEnabled(),
		enabled: appSettings.isGroupNotificationsEnabled(),
		click: () => appSettings.toggleGroupNotificationSoundEnabled(),
	});
	const groupMessagesFlashTrayMenuItem = new MenuItem({
		type: 'checkbox',
		label: 'Taskbar notice',
		checked: appSettings.isGroupFlashTaskbarEnabled(),
		enabled: appSettings.isGroupNotificationsEnabled(),
		click: () => appSettings.toggleGroupFlashTaskbarEnabled(),
	});
	const groupMessagesShowNotificationMenuItem = new MenuItem({
		type: 'checkbox',
		label: 'Show notification',
		checked: appSettings.isGroupNotificationsEnabled(),
		click: () => {
			appSettings.toggleGroupNotificationsEnabled();
			groupMessagesPlaySoundMenuItem.enabled = appSettings.isGroupNotificationsEnabled();
			groupMessagesFlashTrayMenuItem.enabled = appSettings.isGroupNotificationsEnabled();
		},
	});
	const groupMessagesMenuItem = new MenuItem({
		label: 'Group messages',
		submenu: [
			groupMessagesShowNotificationMenuItem,
			groupMessagesFlashTrayMenuItem,
			groupMessagesPlaySoundMenuItem,
		],
	});

	const directMessagesPlaySoundMenuItem = new MenuItem({
		type: 'checkbox',
		label: 'Play sound',
		checked: appSettings.isDirectNotificationSoundEnabled(),
		enabled: appSettings.isDirectNotificationsEnabled(),
		click: () => appSettings.toggleDirectNotificationSoundEnabled(),
	});
	const directMessagesFlashTrayItem = new MenuItem({
		type: 'checkbox',
		label: 'Taskbar notice',
		checked: appSettings.isDirectFlashTaskbarEnabled(),
		enabled: appSettings.isDirectNotificationsEnabled(),
		click: () => appSettings.toggleDirectFlashTaskbarEnabled(),
	});
	const directMessagesShowNotificationMenuItem = new MenuItem({
		type: 'checkbox',
		label: 'Show notification',
		checked: appSettings.isDirectNotificationsEnabled(),
		click: () => {
			appSettings.toggleDirectNotificationsEnabled();
			directMessagesPlaySoundMenuItem.enabled = appSettings.isDirectNotificationsEnabled();
			directMessagesFlashTrayItem.enabled = appSettings.isDirectNotificationsEnabled();
		},
	});
	const directMessagesMenuItem = new MenuItem({
		label: 'Direct messages',
		submenu: [
			directMessagesShowNotificationMenuItem,
			directMessagesFlashTrayItem,
			directMessagesPlaySoundMenuItem,
		],
	});

	appMenu.append(
		new MenuItem({
			label: 'Settings',
			submenu: [groupMessagesMenuItem, directMessagesMenuItem],
		}),
	);

	return appMenu;
}

export const selectionMenu = Menu.buildFromTemplate([
	{ role: 'copy' },
	{ type: 'separator' },
	{ role: 'selectall' },
]);

export const inputMenu = Menu.buildFromTemplate([
	{ role: 'undo' },
	{ role: 'redo' },
	{ type: 'separator' },
	{ role: 'cut' },
	{ role: 'copy' },
	{ role: 'paste' },
	{ type: 'separator' },
	{ role: 'selectall' },
]);
