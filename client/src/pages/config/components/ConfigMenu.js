import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Styles
import styles from "./ConfigMenu.module.css";

const ConfigMenu = () => {
	return (
		<div className={styles.config_menu}>
			<Link className={styles.link} to={"/"}>
				<FontAwesomeIcon icon={["fas", "pen-to-square"]} /> Edit categories
			</Link>
			<Link className={styles.link} to={"/config/user"}>
				<FontAwesomeIcon icon={["fas", "user"]} /> Edit information
			</Link>
			<Link className={styles.link} to={"/"}>
				<FontAwesomeIcon icon={["fas", "arrow-right-from-bracket"]} /> Log out
			</Link>
			<Link className={styles.link + ` ${styles.danger}`} to={"/"}>
				<FontAwesomeIcon icon={["fas", "trash-can"]} /> Delete account
			</Link>
		</div>
	);
};

export default ConfigMenu;
