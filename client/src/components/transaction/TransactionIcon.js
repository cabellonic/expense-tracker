// Components
import CategoryIcon from "components/ui/CategoryIcon";
// Styles
import styles from "./TransactionIcon.module.css";

const TransactionIcon = ({ transaction }) => {
	const { category } = transaction;

	return (
		<figure className={styles.transaction_icon}>
			<CategoryIcon category={category} />
		</figure>
	);
};

export default TransactionIcon;
