import React, { useState, createContext } from 'react';

export const authContext = createContext();
const Authenticate = (props) => {
	const [isLoggedIn, setLogIn] = useState(false);
	const [role, setRole] = useState(null)
	const [authToken, setAuthToken] = useState(null)

	return (
		<authContext.Provider
			value={{
				isLoggedIn,
				setLogIn,
				role,
				setRole,
				authToken,
				setAuthToken,
			}}
		>
			{props.children}
		</authContext.Provider>
	);
};
export default Authenticate;
