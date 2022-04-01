// Components
import CategoryIcon from "components/ui/CategoryIcon";
// Styles
import styles from "./TransactionIcon.module.css";

const TransactionIcon = ({ transaction }) => {
	const { category_slug } = transaction;

	return (
		<figure className={styles.transaction_icon}>
			<CategoryIcon category={category_slug} />
		</figure>
	);
};

export default TransactionIcon;
