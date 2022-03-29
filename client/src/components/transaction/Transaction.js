// Components
import TransactionAmount from "./TransactionAmount";
import TransactionIcon from "./TransactionIcon";
import TransactionInfo from "./TransactionInfo";
// Styles
import styles from "./Transaction.module.css";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Transaction = ({ transaction }) => {
	return (
		<div className={styles.transaction}>
			<TransactionIcon transaction={transaction} />
			<TransactionInfo transaction={transaction} />
			<TransactionAmount transaction={transaction} />
			<Link to={`/edit/${transaction.id}`} className={styles.edit}>
				<FontAwesomeIcon icon={["fas", "pen-to-square"]} /> Edit transaction
			</Link>
		</div>
	);
};

export default Transaction;
