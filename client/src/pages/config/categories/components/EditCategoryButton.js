import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Styles
import styles from "./EditCategoryButton.module.css";

const EditCategoryButton = () => {
	return (
		<span className={styles.edit}>
			<FontAwesomeIcon icon={["fas", "pen-to-square"]} /> Edit
		</span>
	);
};

export default EditCategoryButton;
