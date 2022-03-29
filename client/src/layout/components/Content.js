// Styles
import styles from "./Content.module.css";

const Content = ({ children }) => {
	return (
		<main className={styles.main_content_wrapper}>
			<div className={styles.main_content}>{children}</div>
		</main>
	);
};

export default Content;
