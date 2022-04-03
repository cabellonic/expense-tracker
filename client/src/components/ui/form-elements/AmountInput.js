// Styles
import styles from "./AmountInput.module.css";

const AmountInput = ({ register, error }) => {
	return (
		<fieldset className={styles.fieldset}>
			<span className={styles.currency_symbol}>$</span>
			<input
				className={`${styles.amount} ${error ? styles.error : ""}`}
				step="0.01"
				type="number"
				min={0}
				placeholder={0}
				{...register}
			/>
		</fieldset>
	);
};

export default AmountInput;
