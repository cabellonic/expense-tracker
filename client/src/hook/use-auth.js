import { useEffect, useState } from "react";

export const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const [userToken, setUserToken] = useState(localStorage.getItem("token"));

	useEffect(() => {
		fetch("http://localhost:5000/login", {
			credentials: "include",
			headers: {
				authorization: `Bearer ${userToken}`,
			},
		})
			.catch((err) => {
				return setUserToken(null);
			})
			.then((res) => {
				if (!res || !res.ok || res.status >= 400) {
					setIsLoggedIn(false);
					return setUserToken(null);
				}

				return res.json();
			})
			.then((data) => {
				if (!data || !data.isLoggedIn) return setUserToken(null);
				setIsLoggedIn(true);
				return setUserToken(data.token);
			});
	}, []);

	const login = (token) => {
		setIsLoggedIn(true);
		localStorage.setItem("token", token);
		setUserToken(token);
	};

	const singout = () => {
		setIsLoggedIn(false);
		localStorage.removeItem("token");
		setUserToken("");
	};

	return { userToken, isLoggedIn, login, singout };
};
