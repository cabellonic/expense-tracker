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
	const description =
		"Keep track of your expenses and see how much you can save";

	return (
		<main className={styles.layout}>
			<Helmet
				title={pageTitle === "Expense Tracker" ? "Welcome" : pageTitle}
				titleTemplate={`%s | Expense Tracker`}
			>
				<meta name="description" content={description} />
				<meta name="og:description" content={description} />
				<meta name="twitter:description" content={description} />
				<meta property="og:image" content="/logo512.png" />
				<meta property="twitter:image" content="/logo512.png" />
			</Helmet>
			<Header pageTitle={pageTitle} center={center} href={from} />
			{balance && <Balance />}
			{menu && <Menu />}
			<Content>{children}</Content>
			<Footer />
		</main>
	);
};

export default Layout;
