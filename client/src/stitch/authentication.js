import { AnonymousCredential } from 'mongodb-stitch-browser-sdk';
import { app } from './app';

export function loginAnonymous() {
	const credential = new AnonymousCredential();
	return app.auth.loginWithCredential(credential);
}

export function hasLoggedInUser() {
	return app.auth.isLoggedIn;
}

export function getCurrentUser() {
	return app.auth.isLoggedIn ? app.auth.user : null;
}

export function logoutCurrentUser() {
	const user = getCurrentUser();
	return app.auth.logoutUserWithId(user.id);
}
