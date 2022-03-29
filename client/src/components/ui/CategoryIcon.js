import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Styles
import styles from "./CategoryIcon.module.css";

const CategoryIcon = ({ category }) => {
	if (category === "Salary")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "dollar-sign"]} />
			</span>
		);

	if (category === "Food")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "burger"]} />
			</span>
		);

	if (category === "Sport")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "football"]} />
			</span>
		);

	if (category === "Shopping")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "bag-shopping"]} />
			</span>
		);

	if (category === "Travel")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "taxi"]} />
			</span>
		);

	if (category === "Streaming")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "tv"]} />
			</span>
		);

	if (category === "Insurance")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "car-burst"]} />
			</span>
		);

	if (category === "Healthcare")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "briefcase-medical"]} />
			</span>
		);

	if (category === "Bills")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "money-check-dollar"]} />
			</span>
		);

	if (category === "GYM")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "dumbbell"]} />
			</span>
		);

	if (category === "Clothes")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "shirt"]} />
			</span>
		);

	if (category === "Education")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "graduation-cap"]} />
			</span>
		);

	if (category === "Gift")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "gift"]} />
			</span>
		);

	if (category === "Decor")
		return (
			<span className={styles.category} data-category={category}>
				<FontAwesomeIcon icon={["fas", "couch"]} />
			</span>
		);

	if (category === "Gaming")
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
