import React from "react";
import ContentLoader from "react-content-loader";
// Styles
import styles from "./CategoryPH.module.css";

const CategoryPH = (props) => (
	<div className={styles.category_ph}>
		<ContentLoader
			speed={2}
			width={190}
			height={44}
			viewBox="0 0 190 44"
			backgroundColor="#e8e8e8"
			foregroundColor="#d6d6d6"
			{...props}
		>
			<rect x="0" y="0" rx="10" ry="10" width="44" height="44" />
			<rect x="57" y="16" rx="4" ry="4" width="129" height="13" />
		</ContentLoader>
	</div>
);

export default CategoryPH;
