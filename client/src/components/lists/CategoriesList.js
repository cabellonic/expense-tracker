// Components
import CategoryCard from "components/cards/CategoryCard";
// Styles
import styles from "./CategoriesList.module.css";

const CategoriesList = ({
	categories,
	onClick,
	showCount,
	href = "/category",
	children,
}) => {
	if (!categories.length) {
		return <section className={styles.empty}>Nothing to show here 😭</section>;
	}
	return (
		<div className={styles.category_list}>
			{categories.map((category) => {
				return (
					<CategoryCard
						key={category.id}
						category={category}
						onClick={onClick}
						showCount={showCount}
						href={href}
					>
						{children}
					</CategoryCard>
				);
			})}
		</div>
	);
};

export default CategoriesList;
