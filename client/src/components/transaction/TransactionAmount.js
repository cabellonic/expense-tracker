import { formatAmount } from "util/currency";
// Styles
import styles from "./TransactionAmount.module.css";

const TransactionAmount = ({ transaction }) => {
	const { amount, type } = transaction;
	const formattedAmount = formatAmount(amount);
	const className = type === "expense" ? styles.expense : styles.income;

	return (
		<span className={styles.amount + ` ${className}`}>{formattedAmount}</span>
	);
};

export default TransactionAmount;
