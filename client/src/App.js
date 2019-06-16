import React from 'react';
import './App.css';
import { useStitchStateAuth } from './context/auth-context';
function App() {
	const { isLoggedIn, handleAnonymousLogin } = useStitchStateAuth();
	return isLoggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}
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
function AuthenticatedApp() {
	return <p>Authenticated!</p>;
}

export default App;
