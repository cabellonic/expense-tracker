// Styles
import styles from "./Form.module.css";

const Form = ({ children, ...props }) => {
	return (
		<form className={styles.transaction_form} {...props}>
			{children}
		</form>
	);
};

export default Form;
