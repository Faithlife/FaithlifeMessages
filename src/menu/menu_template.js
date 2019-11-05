export var getTemplate = app => {
	return [
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
					role: 'toggledevtools',
				},
			],
		},
	];
};
