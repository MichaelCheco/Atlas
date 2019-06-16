import React from 'react';
import { useStitchStateAuth } from './context/auth-context';
import AuthenticatedApp from './authenticated-app';
import UnAuthenticatedApp from './unauthenticated-app';
function App() {
	const { isLoggedIn } = useStitchStateAuth();
	return isLoggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}

export default App;
