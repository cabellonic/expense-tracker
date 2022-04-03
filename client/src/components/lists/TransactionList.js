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
			<main>
				{transactions.map((item) => (
					<TransactionCard key={item.id} item={item} />
				))}
			</main>
		</section>
	);
};

export default TransactionList;
