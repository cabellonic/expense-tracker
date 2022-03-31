// Styles
import styles from "./Input.module.css";

const Input = ({ register, error, type, placeholder, ...props }) => {
	return (
		<input
			className={`${styles.input} ${error ? styles.error : ""}`}
			type={type}
			placeholder={placeholder}
			{...register}
			{...props}
		/>
	);
};

export default Input;
