import { useContext, useEffect, useState } from "react";
// Components
import Modal from "components/ui/Modal";
import CategoryIcon from "components/ui/CategoryIcon";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./CategorySelector.module.css";

const CategorySelector = ({ register, setValue, category }) => {
	const [selectedCategory, setSelectedCategory] = useState(category);
	const { userToken } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [categories, setCategories] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const handleModal = () => {
		setShowModal((prevState) => !prevState);
	};

	const handleCategory = (category) => {
		setSelectedCategory(category);
		setValue("category", category.slug);
		setShowModal(false);
	};
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:5000/categories", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			const resData = await response.json();
			setCategories(resData.categories);
			setIsLoading(false);
		};
		fetchData();
	}, [userToken]);

	if (isLoading) return <></>;

	return (
		<>
			<div className={styles.select_category} onClick={handleModal}>
				<div className={styles.category}>
					{selectedCategory ? (
						<>
							<span className={styles.icon}>
								<CategoryIcon category={selectedCategory.slug} />
							</span>
							<span className={styles.name}>{selectedCategory.name}</span>
						</>
					) : (
						<span className={styles.name}>Select category</span>
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
								<span className={styles.icon}>
									<CategoryIcon category={category.slug} />
								</span>
								<span className={styles.name}>{category.name}</span>
							</div>
						))}
					</div>
				</Modal>
			)}
		</>
	);
};

export default CategorySelector;
