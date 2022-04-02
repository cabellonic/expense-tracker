import { Fragment } from "react";
import { Link } from "@reach/router";
// Components
import CategoryIcon from "components/ui/CategoryIcon";
// Styles
import styles from "./CategoriesList.module.css";

const CategoriesList = ({ categories }) => {
	if (categories.length === 0)
		return (
			<>
				<div className={styles.category_list}>
					<div className={styles.empty}>
						<span>You have nothing to filter right now.</span>
						<span>
							Try <Link to="/transactions/add">adding</Link> a transaction!
						</span>
					</div>
				</div>
			</>
		);

	return (
		<div className={styles.category_list}>
			{categories.map((category) => {
				if (!category.count) return <Fragment key={category.id}></Fragment>;
				return (
					<Link
						to={`/categories/${category.slug}`}
						key={category.slug}
						className={styles.category}
					>
						<span className={styles.icon}>
							<CategoryIcon category={category.slug} />
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
