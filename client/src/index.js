import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StitchAuthProvider } from './context/auth-context';
ReactDOM.render(
	<StitchAuthProvider>
		<App />
	</StitchAuthProvider>,
	document.getElementById('root')
);
