import React, { useState, useEffect } from 'react';

// createContext will return an object that contains a component
const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect( () => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

		if ( storedUserLoggedInInformation === '1' ) {
			setIsLoggedIn(true);
		}
	}, [] );

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

		// localStorage is a global object available in browser
		// setItem to save something to localStorage, takes two parameters: a key/value pair, both strings
		localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
