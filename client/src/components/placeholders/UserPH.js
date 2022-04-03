import React from "react";
import ContentLoader from "react-content-loader";

const UserPH = (props) => (
	<ContentLoader
		speed={2}
		width={150}
		height={37}
		viewBox="0 0 150 37"
		backgroundColor="#e8e8e8"
		foregroundColor="#d6d6d6"
		{...props}
	>
		<rect x="52" y="2" rx="4" ry="4" width="53" height="10" />
		<rect x="52" y="20" rx="4" ry="4" width="80" height="13" />
		<circle cx="17" cy="17" r="17" />
	</ContentLoader>
);

export default UserPH;
