// Components
import Button from "components/ui/Button";
// Styles
import styles from "./Pagination.module.css";

const Pagination = ({ paginationInfo, path }) => {
	const currentPage = parseInt(paginationInfo?.current_page || "0");
	const totalPages = parseInt(paginationInfo?.total_pages || "0");

	const showRecent = currentPage > 1;
	const showPrevious = currentPage < totalPages;

	return (
		<nav className={styles.pagination}>
			{showRecent ? (
				<Button href={`${path}/${currentPage - 1}`}>Recent</Button>
			) : (
				<Button disabled>Recent</Button>
			)}
			{showPrevious ? (
				<Button href={`${path}/${currentPage + 1}`}>Old</Button>
			) : (
				<Button disabled>Old</Button>
			)}
		</nav>
	);
};

export default Pagination;
