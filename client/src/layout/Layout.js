// Components
import Header from "./components/Header";
import Balance from "./components/Balance";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
// Styles
import styles from "./Layout.module.css";

// In order to go to de previous page correctly I need to get previous path
// I can use navigate(-1), but it will go back no matter if the previous page is part of my web app or not
// So I decided to get the previous path from a param (from) until I came with a better approach.

const Layout = ({ balance, menu, pageTitle, from, children }) => {
	return (
		<main className={styles.layout}>
			<Header pageTitle={pageTitle} href={from} />
			{balance && <Balance />}
			{menu && <Menu />}
			<Content>{children}</Content>
			<Footer />
		</main>
	);
};

export default Layout;
