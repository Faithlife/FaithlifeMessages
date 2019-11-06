'use strict';
console.log('Loading preload script');

const { ipcRenderer } = require('electron');

const OldNotification = Notification;

Notification = function(title, options) {
	const notificationSettings = ipcRenderer.sendSync('get-notification-settings', {
		title,
		body: options.body,
		isDirect: !options.silent,
	});

	if (notificationSettings.ignoreNotification) {
		return {};
	} else {
		return new OldNotification(title, {
			body: options.body,
			icon: options.icon,
			silent: !notificationSettings.playSound,
		});
	}
};

Notification.prototype = OldNotification.prototype;
Notification.permission = OldNotification.permission;
Notification.requestPermission = OldNotification.requestPermission;
