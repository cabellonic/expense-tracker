import TransactionCard from "./TransactionCard";
// Dummy data
import transactions from "data/transactions";

const TransactionList = () => {
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
