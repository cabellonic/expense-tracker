// Components
import Header from "./components/Header";
import Balance from "./components/Balance";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
// Styles
import styles from "./Layout.module.css";

const Layout = ({ balance, menu, pageTitle, to, children }) => {
	return (
		<main className={styles.layout}>
			<Header pageTitle={pageTitle} href={to} />
			{balance && <Balance />}
			{menu && <Menu />}
			<Content>{children}</Content>
			<Footer />
		</main>
	);
};

export default Layout;
