import { Link } from "@reach/router";
// Styles
import styles from "./HomeHeader.module.css";

const HomeHeader = () => {
	return (
		<div className={styles.header}>
			<span className={styles.title}>Transactions</span>
			<Link className={styles.view_all} to="/transactions">
				View all
			</Link>
		</div>
	);
};

export default HomeHeader;
