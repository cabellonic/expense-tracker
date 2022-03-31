const { createContext } = require("react");

export const AuthContext = createContext({
	isLoggedIn: false,
	userToken: null,
	login: () => {},
	singout: () => {},
});
