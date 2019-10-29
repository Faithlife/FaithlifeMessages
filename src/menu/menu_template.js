export var getTemplate = app => {
	var template = [
		{
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
					role: 'pasteandmatchstyle',
				},
				{
					role: 'delete',
				},
				{
					role: 'selectall',
				},
			],
		},
		{
			label: 'View',
			submenu: [
				{
					role: 'reload',
				},
				{
					type: 'separator',
				},
				{
					role: 'resetzoom',
				},
				{
					role: 'zoomin',
				},
				{
					role: 'zoomout',
				},
				{
					type: 'separator',
				},
				{
					role: 'togglefullscreen',
				},
				{
					role: 'toggledevtools',
				},
			],
		},
		{
			role: 'window',
			submenu: [
				{
					role: 'minimize',
				},
				{
					role: 'close',
				},
			],
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'Get Help',
					click() {
						require('electron').shell.openExternal(
							'http://faithlife.com/faithlife-platform-team',
						);
					},
				},
			],
		},
	];

	if (process.platform === 'darwin') {
		template.unshift({
			label: app.getName(),
			submenu: [
				{
					role: 'about',
				},
				{
					type: 'separator',
				},
				{
					role: 'services',
					submenu: [],
				},
				{
					type: 'separator',
				},
				{
					role: 'hide',
				},
				{
					role: 'hideothers',
				},
				{
					role: 'unhide',
				},
				{
					type: 'separator',
				},
				{
					role: 'quit',
				},
			],
		});
		// Edit menu.
		template[1].submenu.push(
			{
				type: 'separator',
			},
			{
				label: 'Speech',
				submenu: [
					{
						role: 'startspeaking',
					},
					{
						role: 'stopspeaking',
					},
				],
			},
		);
		// Window menu.
		template[3].submenu = [
			{
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				role: 'close',
			},
			{
				label: 'Minimize',
				accelerator: 'CmdOrCtrl+M',
				role: 'minimize',
			},
			{
				label: 'Zoom',
				role: 'zoom',
			},
			{
				type: 'separator',
			},
			{
				label: 'Bring All to Front',
				role: 'front',
			},
		];
	}
	return template;
};
