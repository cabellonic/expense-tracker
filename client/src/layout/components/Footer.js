// Styles
import styles from "./Footer.module.css";

const gitHubURL = "https://github.com/cabellonic/expense-tracker/";

const Footer = () => {
	return (
		<footer className={styles.main_footer}>
			<span>Nicolás Cabello - {new Date().getFullYear()}</span>
			<a
				href={gitHubURL}
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
