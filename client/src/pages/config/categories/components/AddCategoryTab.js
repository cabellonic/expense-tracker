import { Link } from "@reach/router";
// Styles
import styles from "./AddCategoryTab.module.css";

const AddCategoryTab = () => {
	return (
		<Link className={styles.add_category_tab} to="/config/categories/add">
			Add a new category
		</Link>
	);
};

export default AddCategoryTab;
