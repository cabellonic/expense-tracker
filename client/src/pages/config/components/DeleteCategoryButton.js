import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navigate } from "@reach/router";
// Components
import Modal from "components/ui/Modal";
import Button from "components/ui/Button";
import ErrorMessage from "components/ui/form/ErrorMessage";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./DeleteCategoryButton.module.css";

const DeleteCategoryButton = ({ className, category }) => {
	const { logout, userToken } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState();
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleDeleteModal = () => {
		setShowDeleteModal((prevState) => !prevState);
	};

	const handleDelete = async () => {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/categories/${category.slug}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken}`,
				},
			}
		);

		const resData = await response.json();
		// If credentials are invalid
		if (!resData.ok) return setErrorMessage(resData.message);
		handleDeleteModal();
	};

	return (
		<>
			<span onClick={handleDeleteModal} className={className}>
				<FontAwesomeIcon icon={["fas", "trash-can"]} /> Delete
			</span>

			{showDeleteModal && (
				<Modal
					className={styles.delete_modal}
					onClose={handleDeleteModal}
					title="Delete category"
				>
					<span>Are you sure you want to delete this category?</span>
					<span>
						<strong>
							All the transactions in this category will be deleted too!
						</strong>
					</span>
					<span>This action cannot be reversed!</span>
					<span className={styles.error}>
						{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
					</span>
					<Button onClick={handleDelete} red>
						I know what I'm doing
					</Button>
				</Modal>
			)}
		</>
	);
};

export default DeleteCategoryButton;
