import { Helmet } from "react-helmet";
// Components
import Header from "./components/Header";
import Balance from "./components/Balance";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
// Styles
import styles from "./Layout.module.css";

const Layout = ({ balance, menu, pageTitle, center, from, children }) => {
	return (
		<main className={styles.layout}>
			<Helmet
				title={pageTitle === "Expense Tracker" ? "Welcome" : pageTitle}
				titleTemplate={`%s | Expense Tracker`}
			/>
			<Header pageTitle={pageTitle} center={center} href={from} />
			{balance && <Balance />}
			{menu && <Menu />}
			<Content>{children}</Content>
			<Footer />
		</main>
	);
};

export default Layout;
