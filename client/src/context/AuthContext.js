const { createContext } = require("react");

export const AuthContext = createContext({
	isLoggedIn: null,
	userToken: null,
	userId: null,
	login: () => {},
	singout: () => {},
});
