import { useContext } from "react";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./ConfigMenu.module.css";

const ConfigMenu = () => {
	const { logout } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
		// I'll send the user to the main page
		// But the code already do that
		navigate("/");
	};

	return (
		<div className={styles.config_menu}>
			<Link className={styles.item} to={"/"}>
				<FontAwesomeIcon icon={["fas", "pen-to-square"]} /> Edit categories
			</Link>
			<Link className={styles.item} to={"/config/user"}>
				<FontAwesomeIcon icon={["fas", "user"]} /> Edit information
			</Link>
			<span onClick={handleLogout} className={styles.item} to={"/"}>
				<FontAwesomeIcon icon={["fas", "arrow-right-from-bracket"]} /> Log out
			</span>
			<Link className={styles.item + ` ${styles.danger}`} to={"/"}>
				<FontAwesomeIcon icon={["fas", "trash-can"]} /> Delete account
			</Link>
		</div>
	);
};

export default ConfigMenu;
