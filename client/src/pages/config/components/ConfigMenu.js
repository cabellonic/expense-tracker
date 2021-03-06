import { useContext, useState } from "react";
import { Link, navigate } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Components
import Modal from "components/ui/Modal";
import Button from "components/ui/Button";
import ErrorMessage from "components/ui/ErrorMessage";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./ConfigMenu.module.css";

const ConfigMenu = () => {
	const { logout, userToken } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState();
	const [showModal, setShowModal] = useState();

	const handleLogout = () => {
		logout();
		// I'll send the user to the main page
		// But the code already do that
		navigate("/");
	};

	const handleModal = () => {
		setShowModal((prevState) => !prevState);
	};

	const handleDelete = async () => {
		if (!isSubmitting) {
			setIsSubmitting(true);
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
				});

				const resData = await response.json();
				// If credentials are invalid
				setIsSubmitting(false);
				if (!resData.ok) {
					handleModal();
					return setErrorMessage(resData.message);
				}
				handleLogout();
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className={styles.config_menu}>
			<Link className={styles.item} to={"/config/categories"}>
				<FontAwesomeIcon icon={["fas", "pen-to-square"]} /> Edit categories
			</Link>
			<Link className={styles.item} to={"/config/user"}>
				<FontAwesomeIcon icon={["fas", "user"]} /> Edit information
			</Link>
			<span onClick={handleLogout} className={styles.item} to={"/"}>
				<FontAwesomeIcon icon={["fas", "arrow-right-from-bracket"]} /> Log out
			</span>
			<span
				onClick={handleModal}
				className={`${styles.item} ${styles.danger}`}
				to={"/"}
			>
				<FontAwesomeIcon icon={["fas", "trash-can"]} /> Delete account
			</span>
			{showModal && (
				<Modal onClose={handleModal} title="Are you sure?">
					<div
						style={{
							display: "flex",
							flexFlow: "column",
							textAlign: "center",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						Are you sure you want to delete all your account? <br />
						This action cannot be reversed!
						<Button onClick={handleDelete} red disabled={isSubmitting}>
							I'm sure
						</Button>
					</div>
				</Modal>
			)}
			<div className={styles.error_message}>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			</div>
		</div>
	);
};

export default ConfigMenu;
