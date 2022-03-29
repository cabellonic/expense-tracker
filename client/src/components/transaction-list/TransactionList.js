import TransactionCard from "./TransactionCard";
// Styles
// import styles from "./ExpenseList.module.css";

const __TRANSACTION_ITEMS__ = [
	{
		id: "1",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Food",
		title: "McDonalds",
		description: "Lunch",
	},
	{
		id: "2",
		type: "income",
		amount: "25000",
		date: "2022-03-26",
		category: "Salary",
		title: "Salary",
	},
	{
		id: "3",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Sport",
		title: "Argentina vs Venezuela",
		description: "Match ticket",
	},
	{
		id: "4",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Shopping",
		title: "Toys for my nephew",
		description: "Lunch",
	},
	{
		id: "5",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Travel",
		title: "Taxi to work",
	},
	{
		id: "6",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Streaming",
		title: "Spotify",
	},
	{
		id: "8",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Healthcare",
		title: "Dentist",
	},
	{
		id: "9",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Bills",
		title: "Electricity bill",
	},
	{
		id: "10",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "GYM",
		title: "Gym",
	},
	{
		id: "11",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Clothes",
		title: "Shoes",
		description: "Clothes for the winter",
	},
	{
		id: "12",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Education",
		title: "Academind",
		description: "React Native course",
	},
	{
		id: "13",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Gift",
		title: "Mom's Birthday",
	},
	{
		id: "14",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Decor",
		title: "Plants",
		description: "A lime tree",
	},
	{
		id: "15",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Gaming",
		title: "Elden Ring",
		description: "Steam",
	},
	{
		id: "16",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Custom tag",
		title: "Some custom thing",
		description: "Nothing to say",
	},
	{
		id: "17",
		type: "expense",
		amount: "-1200",
		date: "2022-03-26",
		category: "Another tag",
		title: "Another custom thing with a long title",
	},
];

const TransactionList = () => {
	return (
		<section>
			<main>
				{__TRANSACTION_ITEMS__.map((item) => (
					<TransactionCard key={item.id} item={item} />
				))}
			</main>
		</section>
	);
};

export default TransactionList;
