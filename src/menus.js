import { Menu } from 'electron';

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
