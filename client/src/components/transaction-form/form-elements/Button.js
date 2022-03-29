// Styles
import styles from "./Button.module.css";

const Button = ({ children, green, red, ...props }) => {
	let className = styles.button;
	if (green) className += ` ${styles.green}`;
	else if (red) className += ` ${styles.red}`;

	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export default Button;
