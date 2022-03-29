// Styles
import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.main_footer}>
			<span>Nicolás Cabello - {new Date().getFullYear()}</span>
			<a
				href="/"
				className={styles.link}
				target="_blank"
				rel="noopener noreferrer"
			>
				Ver en GitHub
			</a>
		</footer>
	);
};

export default Footer;
