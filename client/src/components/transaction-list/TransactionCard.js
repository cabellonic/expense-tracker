// Util
import { getCurrency } from "util/currency";
// Components
import CategoryIcon from "components/ui/CategoryIcon";
// Styles
import styles from "./TransactionCard.module.css";

const TransactionCard = ({ item }) => {
	const { type, title, amount, category } = item;
	return (
		<div className={styles.transaction_card}>
			<div className={styles.icon}>
				<CategoryIcon category={category} />
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.info}>
				<span
					className={`${styles.amount} ${
						type === "expense" ? styles.expense : styles.income
					}`}
				>
					{getCurrency(amount)}
				</span>
				<span className={styles.time_ago}>Yesterday</span>
			</div>
		</div>
	);
};

export default TransactionCard;
