import TransactionCard from "./TransactionCard";

const TransactionList = ({ transactions }) => {
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
