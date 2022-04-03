import React from "react";
import ContentLoader from "react-content-loader";
// Styles
import styles from "./TransactionPH.module.css";

const TransactionPH = (props) => (
	<div className={styles.transaction_ph}>
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
		<ContentLoader
			speed={2}
			width={50}
			height={44}
			viewBox="0 0 50 44"
			backgroundColor="#e8e8e8"
			foregroundColor="#d6d6d6"
			{...props}
		>
			<rect x="9" y="8" rx="4" ry="4" width="41" height="11" />
			<rect x="0" y="28" rx="4" ry="4" width="50" height="12" />
		</ContentLoader>
	</div>
);

export default TransactionPH;
