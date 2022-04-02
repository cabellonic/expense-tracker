import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Components
import CategoryIcon from "components/ui/CategoryIcon";
import Modal from "components/ui/Modal";
import Button from "components/ui/Button";
// Styles
import styles from "./CategoryCard.module.css";
import DeleteCategoryButton from "./DeleteCategoryButton";

const CategoryCard = ({ category }) => {
	const [showEditModal, setShowEditModal] = useState(false);

	const handleEditModal = () => {
		setShowEditModal((prevState) => !prevState);
	};

	return (
		<>
			<div className={styles.category}>
				<span className={styles.icon}>
					<CategoryIcon category={category.slug} />
				</span>
				<span className={styles.name}>{category.name}</span>
				<span onClick={handleEditModal} className={styles.edit}>
					<FontAwesomeIcon icon={["fas", "pen-to-square"]} /> Edit
				</span>
			</div>

			{showEditModal && (
				<Modal onClose={handleEditModal} title="Edit category">
					Editar???
				</Modal>
			)}
		</>
	);
};

export default CategoryCard;
