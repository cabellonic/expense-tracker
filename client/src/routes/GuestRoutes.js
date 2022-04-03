import { Router } from "@reach/router";
// Pages
import LoginPage from "pages/auth/login";
import SingupPage from "pages/auth/singup";
import GuestHomePage from "pages/home/guest";
// Common page
import NotFoundPage from "pages/not-found/not-found";

const GuestRoutes = () => {
	return (
		<Router>
			<GuestHomePage path="/" />
			<LoginPage path="/login" />
			<SingupPage path="/singup" />

			<NotFoundPage default />
		</Router>
	);
};

export default GuestRoutes;
