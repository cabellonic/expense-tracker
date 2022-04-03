import CategoryPH from "components/placeholders/CategoryPH";
// Styles
import styles from "./CategoriesList.module.css";

const CategoryListPH = () => {
	return (
		<div className={styles.category_list}>
			{Array.from({ length: 14 }).map((_, i) => (
				<CategoryPH key={i} />
			))}
		</div>
	);
};

export default CategoryListPH;
