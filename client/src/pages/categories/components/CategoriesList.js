import { Link } from "@reach/router";
// Components
import CategoryIcon from "components/ui/CategoryIcon";
// Styles
import styles from "./CategoriesList.module.css";
// Dummy Data
import categories from "data/categories";

const CategoriesList = () => {
	return (
		<div className={styles.category_list}>
			{categories.map((category) => {
				if (!category.count) return <></>;
				return (
					<Link
						to={`/categories/${category.id}`}
						key={category.id}
						className={styles.category}
					>
						<span className={styles.icon}>
							<CategoryIcon category={category.name} />
						</span>
						<span className={styles.name}>{category.name}</span>
						<span className={styles.count}>{category.count}</span>
					</Link>
				);
			})}
		</div>
	);
};

export default CategoriesList;
