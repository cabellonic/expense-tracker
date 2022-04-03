import { Link } from "@reach/router";
// Components
import CategoryIcon from "components/ui/CategoryIcon";
// Styles
import styles from "./CategoryCard.module.css";

const CategoryWrapper = ({ category, onClick, href, children }) => {
	if (onClick) {
		return (
			<div className={styles.category_card} onClick={() => onClick(category)}>
				{children}
			</div>
		);
	}

	return (
		<Link to={`${href}/${category.slug}`} className={styles.category_card}>
			{children}
		</Link>
	);
};

const CategoryCard = ({ category, showCount, onClick, href, children }) => {
	const { slug, name } = category;

	return (
		<CategoryWrapper category={category} onClick={onClick} href={href}>
			<span className={styles.icon}>
				<CategoryIcon category={slug} />
			</span>
			<span className={styles.name}>{name}</span>
			{showCount && category.count && (
				<span className={styles.right}>
					<span className={styles.count}>{category.count}</span>
				</span>
			)}
			{!showCount && children && (
				<span className={styles.right}>{children}</span>
			)}
		</CategoryWrapper>
	);
};

export default CategoryCard;
