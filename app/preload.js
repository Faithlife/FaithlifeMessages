(function() {
	'use strict';
	console.log('Loading preload script');

	const { ipcRenderer } = require('electron');

	const OldNotification = Notification;

	Notification = function(title, options) {
		ipcRenderer.send('notification-shim', {
			title,
			options,
		});

		return new OldNotification(title, options);
	};

	Notification.prototype = OldNotification.prototype;
	Notification.permission = OldNotification.permission;
	Notification.requestPermission = OldNotification.requestPermission;
})();
