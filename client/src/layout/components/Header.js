import { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./Header.module.css";

const Header = ({ pageTitle, center, href = "/home" }) => {
	const { userToken, logout } = useContext(AuthContext);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (userToken) {
			const getUserData = async () => {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				});
				const resData = await response.json();
				if (!resData.ok) return logout();
				setUserData(resData.user);
			};
			getUserData();
		}
	}, [userToken]);

	if (pageTitle)
		return (
			<header className={styles.header_wrapper}>
				<div className={styles.header}>
					{!center && (
						<Link to={href} aria-label="Go home" className={styles.icon}>
							<FontAwesomeIcon icon={["fas", "arrow-left"]} />
						</Link>
					)}
					<span
						className={`${styles.page_title} ${center ? styles.center : ""}`}
					>
						{pageTitle}
					</span>
				</div>
			</header>
		);

	return (
		<header className={styles.header_wrapper}>
			<div className={styles.header}>
				<figure className={styles.avatar}>
					<img
						src={`https://cabellonic.dev/images/photo_alt.webp`}
						alt="avatar"
					/>
				</figure>
				<div className={styles.user_info}>
					<span className={styles.welcome}>Welcome</span>
					<span className={styles.user_name}>
						{userData ? userData.first_name : "user"}
					</span>
				</div>
			</div>
		</header>
	);
};

export default Header;
