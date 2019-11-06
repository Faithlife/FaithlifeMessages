import { app } from 'electron';
import jetpack from 'fs-jetpack';

const userDataDir = jetpack.cwd(app.getPath('userData'));
const filename = 'settings.json';

export class AppSettings {
	constructor() {
		this.settings = {
			isGroupNotificationsEnabled: false,
			isGroupFlashTaskbarEnabled: false,
			isGroupNotificationSoundEnabled: false,

			isDirectNotificationsEnabled: true,
			isDirectFlashTaskbarEnabled: true,
			isDirectNotificationSoundEnabled: false,
		};
	}

	isGroupNotificationSoundEnabled() {
		return this.settings.isGroupNotificationSoundEnabled;
	}

	toggleGroupNotificationSoundEnabled() {
		this.settings.isGroupNotificationSoundEnabled = !this.settings
			.isGroupNotificationSoundEnabled;
	}

	isGroupFlashTaskbarEnabled() {
		return this.settings.isGroupFlashTaskbarEnabled;
	}

	toggleGroupFlashTaskbarEnabled() {
		this.settings.isGroupFlashTaskbarEnabled = !this.settings.isGroupFlashTaskbarEnabled;
	}

	isDirectNotificationSoundEnabled() {
		return this.settings.isDirectNotificationSoundEnabled;
	}

	toggleDirectNotificationSoundEnabled() {
		this.settings.isDirectNotificationSoundEnabled = !this.settings
			.isDirectNotificationSoundEnabled;
	}

	isGroupNotificationsEnabled() {
		return this.settings.isGroupNotificationsEnabled;
	}

	toggleGroupNotificationsEnabled() {
		this.settings.isGroupNotificationsEnabled = !this.settings.isGroupNotificationsEnabled;
	}

	isDirectNotificationsEnabled() {
		return this.settings.isDirectNotificationsEnabled;
	}

	toggleDirectNotificationsEnabled() {
		this.settings.isDirectNotificationsEnabled = !this.settings.isDirectNotificationsEnabled;
	}

	isDirectFlashTaskbarEnabled() {
		return this.settings.isDirectFlashTaskbarEnabled;
	}

	toggleDirectFlashTaskbarEnabled() {
		this.settings.isDirectFlashTaskbarEnabled = !this.settings.isDirectFlashTaskbarEnabled;
	}

	initialize() {
		var savedSettings = {};
		try {
			savedSettings = userDataDir.read(filename, 'json');
		} catch (err) {}

		Object.assign(this.settings, savedSettings);
	}

	save() {
		userDataDir.write(filename, this.settings, { atomic: true });
	}
}
