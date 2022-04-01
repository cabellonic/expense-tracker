import { useEffect, useState } from "react";
import { Link } from "@reach/router";
// Components
import CategoryIcon from "components/ui/CategoryIcon";
// Styles
import styles from "./CategoriesList.module.css";

const CategoriesList = ({ categories }) => {
	return (
		<div className={styles.category_list}>
			{categories.map((category) => {
				// if (!category.count) return <Fragment key={category.id}></Fragment>;
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
						{/* <span className={styles.count}>{category.count}</span> */}
					</Link>
				);
			})}
		</div>
	);
};

export default CategoriesList;
