import React from 'react';
import {
	loginAnonymous,
	logoutCurrentUser,
	getCurrentUser,
	hasLoggedInUser,
} from '../stitch';

function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN': {
			return { isLoggedIn: true, currentUser: action.loggedInUser };
		}
		case 'LOGOUT': {
			return { isLoggedIn: false, currentUser: null };
		}
		default: {
			throw new Error(`unsupported action type ${action.type}`);
		}
	}
}

const StitchAuthStateContext = React.createContext();
const StitchAuthDispatchContext = React.createContext();

function useStitchStateAuth() {
	const context = React.useContext(StitchAuthStateContext);
	if (!context) {
		throw new Error(`useStitchAuth must be rendered with a StitchAuthProvider`);
	}
	return context;
}
function useStitchDispatchAuth() {
	const context = React.useContext(StitchAuthDispatchContext);
	if (!context) {
		throw new Error(`useStitchAuth must be rendered with a StitchAuthProvider`);
	}
	return context;
}

function StitchAuthProvider({ children }) {
	const [{ isLoggedIn, currentUser }, dispatch] = React.useReducer(
		authReducer,
		{
			isLoggedIn: hasLoggedInUser(),
			currentUser: getCurrentUser(),
		}
	);

	const handleAnonymousLogin = async () => {
		if (!isLoggedIn) {
			const loggedInUser = await loginAnonymous();
			dispatch({ type: 'LOGIN', loggedInUser });
		}
	};
	const handleLogout = async () => {
		if (isLoggedIn) {
			await logoutCurrentUser();
			dispatch({ type: 'LOGOUT' });
		} else {
			console.log(`No user logged in to logout`);
		}
	};
	return (
		<StitchAuthStateContext.Provider
			value={{ isLoggedIn, currentUser, handleAnonymousLogin, handleLogout }}>
			<StitchAuthDispatchContext.Provider value={dispatch}>
				{children}
			</StitchAuthDispatchContext.Provider>
		</StitchAuthStateContext.Provider>
	);
}

export { StitchAuthProvider, useStitchDispatchAuth, useStitchStateAuth };
