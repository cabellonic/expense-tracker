// Styles
import styles from "./Fieldset.module.css";

const Fieldset = ({ children }) => {
	return <fieldset className={styles.fieldset}>{children}</fieldset>;
};

export default Fieldset;
