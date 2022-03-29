export const formatAmount = (amount) => {
	const config = {
		style: "currency",
		currency: "USD",
	};

	return Intl.NumberFormat("en-US", config).format(amount);
};
