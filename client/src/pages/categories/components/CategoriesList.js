import { useEffect, useState } from "react";
import { Link } from "@reach/router";
// Components
import CategoryIcon from "components/ui/CategoryIcon";
// Styles
import styles from "./CategoriesList.module.css";
// Dummy Data
// import categories from "data/categories";

const CategoriesList = () => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:5000/categories");
			const resData = await response.json();
			setCategories(resData);
		};
		fetchData();
	}, []);

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
							<CategoryIcon category={category.name} />
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
