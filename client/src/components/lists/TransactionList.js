// Components
import TransactionCard from "components/cards/TransactionCard";
// Styles
import styles from "./TransactionList.module.css";

const TransactionList = ({ transactions }) => {
	if (!transactions)
		return (
			<section className={styles.empty}>
				You havo no transactions. Try adding one!
			</section>
		);

	return (
		<section>
			{transactions.map((item) => (
				<TransactionCard key={item.id} item={item} />
			))}
		</section>
	);
};

export default TransactionList;
