import { Link } from "@reach/router";
// Styles
import styles from "./Button.module.css";

const Button = ({ children, green, red, type, href, ...props }) => {
	let className = styles.button;
	if (green) className += ` ${styles.green}`;
	else if (red) className += ` ${styles.red}`;

	if (href)
		return (
			<Link to={href} className={className} {...props}>
				{children}
			</Link>
		);

	if (type)
		return (
			<button className={className} {...props}>
				{children}
			</button>
		);
	return (
		<span className={className} {...props}>
			{children}
		</span>
	);
};

export default Button;
