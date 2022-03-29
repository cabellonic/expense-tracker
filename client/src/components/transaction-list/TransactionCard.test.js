import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
// Component
import TransactionCard from "./TransactionCard";
// Util
import { getCurrency } from "util/currency";
import { registerIcons } from "util/fontAwesome";
registerIcons();

test("renders content", () => {
	const item = {
		id: "1",
		title: "A transaction title",
		description: "The description of the transaction",
		amount: "100",
		date: "2020-01-01",
		category: "Shopping",
		type: "expense",
	};
	const component = render(<TransactionCard item={item} />);
	const formattedCurrency = getCurrency(item.amount);

	expect(component.container).toHaveTextContent(item.title);
	expect(component.container).toHaveTextContent(formattedCurrency);
	expect(component.container.querySelector("span")).toHaveAttribute(
		"data-category",
		item.category
	);
	expect(component.getByText(formattedCurrency)).toHaveClass(item.type);
	expect(component.getByText(formattedCurrency)).not.toHaveClass("income");
});
