// Styles
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ children }) => {
	return <p className={styles.error}>{children}</p>;
};

export default ErrorMessage;
