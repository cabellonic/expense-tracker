import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Styles
import styles from "./CategoryIcon.module.css";

const CategoryIcon = ({ category }) => {
	if (category === "salary")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "dollar-sign"]} />
			</span>
		);

	if (category === "food")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "burger"]} />
			</span>
		);

	if (category === "sport")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "football"]} />
			</span>
		);

	if (category === "shopping")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "bag-shopping"]} />
			</span>
		);

	if (category === "travel")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "taxi"]} />
			</span>
		);

	if (category === "streaming")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "tv"]} />
			</span>
		);

	if (category === "insurance")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "car-burst"]} />
			</span>
		);

	if (category === "healthcare")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "briefcase-medical"]} />
			</span>
		);

	if (category === "bills")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "money-check-dollar"]} />
			</span>
		);

	if (category === "gym")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "dumbbell"]} />
			</span>
		);

	if (category === "clothes")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "shirt"]} />
			</span>
		);

	if (category === "education")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "graduation-cap"]} />
			</span>
		);

	if (category === "gift")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "gift"]} />
			</span>
		);

	if (category === "decoration")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "couch"]} />
			</span>
		);

	if (category === "gaming")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "gamepad"]} />
			</span>
		);

	return (
		<span className={styles.category} data-category={category}>
			<FontAwesomeIcon icon={["fas", "tags"]} />
		</span>
	);
};

export default CategoryIcon;
