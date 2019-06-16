import React from 'react';
import './App.css';
import { useStitchStateAuth } from './context/auth-context';
function App() {
	const { isLoggedIn } = useStitchStateAuth();
	return isLoggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />;
}
function UnAuthenticatedApp() {
	return (
		<div className="App">
			<header className="App-header">
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}
function AuthenticatedApp() {
	return <p>Authenticated!</p>;
}

export default App;
