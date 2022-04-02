import { Link } from "@reach/router";
// Util
import { formatAmount } from "util/currency";
import { formatTimeAgo } from "util/date";
// Components
import CategoryIcon from "components/ui/CategoryIcon";
// Styles
import styles from "./TransactionCard.module.css";

const TransactionCard = ({ item }) => {
	const { id, type, title, amount, category_slug, created_at } = item;
	const formattedAmount = formatAmount(amount);
	const formattedDate = formatTimeAgo(created_at);

	return (
		<Link to={`/transaction/${id}`} className={styles.transaction_card}>
			<div className={styles.icon}>
				<CategoryIcon category={category_slug} />
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.info}>
				<span
					className={`${styles.amount} ${
						type === "expense" ? styles.expense : styles.income
					}`}
				>
					{formattedAmount}
				</span>
				<span className={styles.time_ago}>{formattedDate}</span>
			</div>
		</Link>
	);
};

export default TransactionCard;
