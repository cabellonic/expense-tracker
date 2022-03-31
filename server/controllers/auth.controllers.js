exports.login = (req, res) => {
	console.log(req.body);
	res.status(200).json({ message: "Login successful" });
};

exports.singup = (req, res) => {
	console.log(req.body);
	res.status(200).json({ message: "Sing up successful" });
};
