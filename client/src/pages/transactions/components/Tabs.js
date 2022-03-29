import { Link } from "@reach/router";
// Styles
import styles from "./Tabs.module.css";

const Tabs = () => {
	return (
		<nav className={styles.tabs}>
			<Link
				to="/transactions"
				className={styles.tab}
				getProps={({ isCurrent }) =>
					isCurrent
						? { className: `${styles.tab} ${styles.active}` }
						: styles.tab
				}
			>
				All
			</Link>
			<Link
				to="/transactions/incomes"
				className={styles.tab}
				getProps={({ isCurrent }) =>
					isCurrent
						? { className: `${styles.tab} ${styles.active}` }
						: styles.tab
				}
			>
				Incomes
			</Link>
			<Link
				to="/transactions/expenses"
				className={styles.tab}
				getProps={({ isCurrent }) =>
					isCurrent
						? { className: `${styles.tab} ${styles.active}` }
						: styles.tab
				}
			>
				Expenses
			</Link>
		</nav>
	);
};

export default Tabs;
