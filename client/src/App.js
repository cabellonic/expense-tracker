// Components
import Loading from "layout/Loading";
// Routes
import PrivateRoutes from "routes/PrivateRoutes";
import GuestRoutes from "routes/GuestRoutes";
// Hookes
import { useAuth } from "hook/use-auth";
// Context
import { AuthContext } from "context/AuthContext";
// Util
import { registerIcons } from "util/fontAwesome";

registerIcons();

const App = () => {
	const { isLoggedIn, token, userId, login, logout } = useAuth();

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, userToken: token, userId: userId, login, logout }}
		>
			{isLoggedIn === null ? (
				<Loading />
			) : (
				<>{isLoggedIn ? <PrivateRoutes /> : <GuestRoutes />}</>
			)}
		</AuthContext.Provider>
	);
};

export default App;
