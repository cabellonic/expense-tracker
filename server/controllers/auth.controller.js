const { handleLogin, login } = require("./auth/login.controller");
const { singup } = require("./auth/singup.controller");

module.exports = {
	handleLogin,
	login,
	singup,
};
