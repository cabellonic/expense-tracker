import { useState } from "react";
// Components
import Modal from "components/ui/Modal";
import CategoryIcon from "components/ui/CategoryIcon";
// Styles
import styles from "./CategorySelector.module.css";

// Dummy Data
import categories from "data/categories";

const CategorySelector = ({ register, setValue, category }) => {
	const [selectedCategory, setSelectedCategory] = useState(category);
	const [showModal, setShowModal] = useState(false);

	const handleModal = () => {
		setShowModal((prevState) => !prevState);
	};

	const handleCategory = (category) => {
		setSelectedCategory(category);
		setValue("category", category.name);
		setShowModal(false);
	};

	return (
		<>
			<div className={styles.select_category} onClick={handleModal}>
				<div className={styles.category}>
					{selectedCategory ? (
						<>
							<CategoryIcon category={selectedCategory.name} />
							<input
								className={styles.category_name}
								type="text"
								placeholder="Category"
								{...register}
								readOnly
							/>
						</>
					) : (
						<span className={styles.category_name}>Select category</span>
					)}
				</div>
			</div>

			{showModal && (
				<Modal onClose={handleModal} title="Select Category">
					<div className={styles.category_list}>
						{categories.map((category) => (
							<div
								key={category.id}
								className={styles.category}
								onClick={() => handleCategory(category)}
							>
								<CategoryIcon category={category.name} />
								<span className={styles.category_name}>{category.name}</span>
							</div>
						))}
					</div>
				</Modal>
			)}
		</>
	);
};

export default CategorySelector;
