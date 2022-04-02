import { useContext, useEffect, useState } from "react";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./Header.module.css";

const Header = ({ pageTitle, center, href = "/home" }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { userToken } = useContext(AuthContext);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:5000/user", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			const resData = await response.json();
			setUser(resData.user);
			setIsLoading(false);
		};
		fetchData();
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
				{!isLoading && user && (
					<>
						<figure className={styles.avatar}>
							<img
								src={`https://cabellonic.dev/images/photo_alt.webp`}
								alt="avatar"
							/>
						</figure>
						<div className={styles.user_info}>
							<span className={styles.welcome}>Welcome</span>
							<span className={styles.user_name}>{user.first_name}</span>
						</div>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
