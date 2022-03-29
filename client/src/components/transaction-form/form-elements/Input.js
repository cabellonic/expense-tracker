// Styles
import styles from "./Input.module.css";

const Input = ({ register, error, placeholder }) => {
	return (
		<input
			className={`${styles.input} ${error ? styles.error : ""}`}
			type="text"
			placeholder={placeholder}
			{...register}
		/>
	);
};

export default Input;
