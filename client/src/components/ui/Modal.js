import { createPortal } from "react-dom";
// Styles
import styles from "./Modal.module.css";

const ModalElement = ({ children, onClose, title }) => {
	return (
		<>
			<div className={styles.backdrop} onClick={onClose} />
			<div className={styles.modal_wrapper}>
				<div className={styles.modal}>
					<header>{title}</header>
					<main>{children}</main>
				</div>
			</div>
		</>
	);
};

const Modal = ({ children, ...props }) => {
	const modalRoot = document.getElementById("modal");
	if (!modalRoot) return <></>;

	return createPortal(
		<ModalElement {...props}>{children}</ModalElement>,
		modalRoot
	);
};

export default Modal;
