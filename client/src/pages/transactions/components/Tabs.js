import { Link } from "@reach/router";
// Styles
import styles from "./Tabs.module.css";

const Tabs = () => {
	return (
		<nav className={styles.tabs}>
			<Link
				to="/transactions"
				className={styles.tab}
				getProps={({ isPartiallyCurrent }) =>
					isPartiallyCurrent
						? { className: `${styles.tab} ${styles.active}` }
						: { className: styles.tab }
				}
			>
				All
			</Link>
			<Link
				to="/incomes"
				className={styles.tab}
				getProps={({ isPartiallyCurrent }) =>
					isPartiallyCurrent
						? { className: `${styles.tab} ${styles.active}` }
						: { className: styles.tab }
				}
			>
				Incomes
			</Link>
			<Link
				to="/expenses"
				className={styles.tab}
				getProps={({ isPartiallyCurrent }) =>
					isPartiallyCurrent
						? { className: `${styles.tab} ${styles.active}` }
						: { className: styles.tab }
				}
			>
				Expenses
			</Link>
		</nav>
	);
};

export default Tabs;
