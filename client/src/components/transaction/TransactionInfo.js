// Util
import { formatDate } from "util/date";
// Styles
import styles from "./TransactionInfo.module.css";

const TransactionInfo = ({ transaction }) => {
	const { title, note, date } = transaction;
	const formattedDate = formatDate(date);

	return (
		<div className={styles.transaction_info}>
			<span className={styles.title}>{title}</span>
			{note && <span className={styles.date}>{note}</span>}
			<span className={styles.date}>{formattedDate}</span>
		</div>
	);
};

export default TransactionInfo;