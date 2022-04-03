import TransactionPH from "components/placeholders/TransactionPH";

const TransactionListPH = () => {
	return (
		<>
			{Array.from({ length: 10 }).map((_, i) => (
				<TransactionPH key={i} />
			))}
		</>
	);
};

export default TransactionListPH;
