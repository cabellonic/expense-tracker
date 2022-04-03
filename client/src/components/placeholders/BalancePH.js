import React from "react";
import ContentLoader from "react-content-loader";

const BalancePH = (props) => (
	<ContentLoader
		speed={2}
		width={280}
		height={135}
		viewBox="0 0 280 135"
		backgroundColor="#e8e8e855"
		foregroundColor="#d6d6d622"
		{...props}
	>
		<circle cx="12" cy="109" r="12" />
		<circle cx="193" cy="109" r="12" />
		<rect x="92" y="4" rx="4" ry="4" width="94" height="16" />
		<rect x="77" y="39" rx="4" ry="4" width="124" height="21" />
		<rect x="214" y="94" rx="5" ry="5" width="65" height="15" />
		<rect x="32" y="94" rx="5" ry="5" width="65" height="15" />
		<rect x="32" y="114" rx="5" ry="5" width="65" height="14" />
		<rect x="214" y="114" rx="5" ry="5" width="65" height="14" />
	</ContentLoader>
);

export default BalancePH;
