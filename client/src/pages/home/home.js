import Layout from "layout/Layout";
import TransactionList from "components/transaction-list/TransactionList";
import HomeHeader from "./components/HomeHeader";

function HomePage() {
	return (
		<Layout balance menu>
			<HomeHeader />
			<TransactionList />
		</Layout>
	);
}

export default HomePage;
