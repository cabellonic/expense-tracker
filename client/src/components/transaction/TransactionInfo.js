// Util
import { formatDate, formatTimeAgo } from "util/date";
// Styles
import styles from "./TransactionInfo.module.css";

const TransactionInfo = ({ transaction }) => {
	const { title, note, created_at, updated_at } = transaction;
	const formattedDate = formatDate(created_at);

	return (
		<div className={styles.transaction_info}>
			<span className={styles.title}>{title}</span>
			{note && <span className={styles.date}>{note}</span>}
			<span className={styles.date}>{formattedDate}</span>
			{updated_at && (
				<span className={styles.date}>
					Last edit: {formatTimeAgo(updated_at)}
				</span>
			)}
		</div>
	);
};

export default TransactionInfo;
