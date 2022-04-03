import { useContext, useEffect, useState } from "react";
// Components
import Modal from "components/ui/Modal";
import CategoryIcon from "components/ui/CategoryIcon";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./CategorySelector.module.css";
import CategoriesList from "components/lists/CategoriesList";

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
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/categories`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
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
					<CategoriesList categories={categories} onClick={handleCategory} />
				</Modal>
			)}
		</>
	);
};

export default CategorySelector;
