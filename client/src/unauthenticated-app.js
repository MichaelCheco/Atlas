import React from 'react';
import { useStitchStateAuth } from './context/auth-context';
function UnAuthenticatedApp() {
	const { handleAnonymousLogin } = useStitchStateAuth();
	return (
		<div className="App">
			<header className="App-header">
				<button onClick={handleAnonymousLogin}>Anonymous Login</button>
			</header>
		</div>
	);
}
export default UnAuthenticatedApp;
