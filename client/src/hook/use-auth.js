import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const [userId, setUserId] = useState(null);
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();

	const login = useCallback((userToken, userId, expirationDate) => {
		setToken(userToken);
		setUserId(userId);
		setIsLoggedIn(true);
		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			"userData",
			JSON.stringify({
				token: userToken,
				userId: userId,
				expiration: tokenExpirationDate.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setIsLoggedIn(false);
		setToken(null);
		setUserId(null);
		setTokenExpirationDate(null);
		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("userData"));
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			login(
				storedData.token,
				storedData.userId,
				new Date(storedData.expiration)
			);
		} else {
			logout();
		}
	}, [login]);

	return { token, userId, isLoggedIn, login, logout };
};
