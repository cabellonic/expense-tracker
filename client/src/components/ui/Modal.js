import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPortal } from "react-dom";
// Styles
import styles from "./Modal.module.css";

const ModalElement = ({ children, onClose, title, className }) => {
	return (
		<>
			<div className={styles.backdrop} onClick={onClose} />
			<div className={styles.modal_wrapper}>
				<div className={styles.modal}>
					<header className={styles.header}>
						<span className={styles.title}>{title}</span>
						<span className={styles.close} onClick={onClose}>
							<FontAwesomeIcon icon={["fas", "xmark"]} />
						</span>
					</header>
					<main className={`${styles.content} ${className ? className : ""}`}>
						{children}
					</main>
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
