// This is a personal app, so a 404 page is not really needed.
// Instead I will use it to redirect the user to the home page.
// The home page will depend on the user's authentication status.

import { useContext, useEffect } from "react";
import { navigate } from "@reach/router";
// Context
import { AuthContext } from "context/AuthContext";

const NotFoundPage = () => {
	const auth = useContext(AuthContext);
	useEffect(() => {
		if (auth.isLoggedIn) {
			navigate("/home");
		} else {
			navigate("/");
		}
	}, []);
	return <></>;
};

export default NotFoundPage;
