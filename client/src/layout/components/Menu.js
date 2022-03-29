import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Styles
import styles from "./Menu.module.css";

const Menu = () => {
	return (
		<nav className={styles.main_menu}>
			<Link className={styles.navlink} data-icon="income" to="/add/income">
				<FontAwesomeIcon icon={["fas", "circle-plus"]} />
			</Link>
			<Link className={styles.navlink} data-icon="expense" to="/add/expense">
				<FontAwesomeIcon icon={["fas", "circle-minus"]} />
			</Link>
			<Link className={styles.navlink} data-icon="filter" to="/">
				<FontAwesomeIcon icon={["fas", "filter-circle-dollar"]} />
			</Link>
			<Link className={styles.navlink} data-icon="config" to="/">
				<FontAwesomeIcon icon={["fas", "gear"]} />
			</Link>
		</nav>
	);
};

export default Menu;
