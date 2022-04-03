import { useContext, useState } from "react";
import { navigate } from "@reach/router";
import { useForm } from "react-hook-form";
// Components
import Form from "components/ui/form-elements/Form";
import Modal from "components/ui/Modal";
import ErrorMessage from "components/ui/ErrorMessage";
import Button from "components/ui/Button";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./DeleteCategoryForm.module.css";

const DeleteCategoryForm = ({ category }) => {
	const { userToken } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState();
	const [showModal, setShowModal] = useState(false);
	const { handleSubmit } = useForm();

	const onSubmit = async () => {
		if (!isSubmitting) {
			setIsSubmitting(true);
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/category/${category.slug}`,
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
			setIsSubmitting(false);
			if (!resData.ok) return setErrorMessage(resData.message);
			handleModal();
			navigate("/config/categories");
		}
	};

	const handleModal = () => {
		setShowModal((prevState) => !prevState);
	};

	return (
		<>
			<span onClick={handleModal}>
				<Button red>Delete</Button>
			</span>
			{showModal && (
				<Modal onClose={handleModal} title="Delete category">
					<Form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.delete_modal}>
							<span>Are you sure you want to delete this category?</span>
							<span>This action cannot be reversed!</span>
							<span className={styles.error}>
								{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
							</span>
							<Button onClick={() => onSubmit()} red disabled={isSubmitting}>
								I know what I'm doing
							</Button>
						</div>
					</Form>
				</Modal>
			)}
		</>
	);
};

export default DeleteCategoryForm;
