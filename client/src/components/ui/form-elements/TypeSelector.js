import { useState } from "react";
// Styles
import styles from "./TypeSelector.module.css";

const TYPE = {
	expense: "expense",
	income: "income",
};

const TypeSelector = ({ setValue, type, disabled }) => {
	const [selectedType, setSelectedType] = useState(type);

	const handleType = (type) => {
		if (disabled) return;
		if (type === selectedType) return;
		if (type === TYPE.expense) {
			setValue("type", TYPE.expense);
			return setSelectedType(TYPE.expense);
		}
		setValue("type", TYPE.income);
		return setSelectedType(TYPE.income);
	};

	const incomeClass = disabled
		? `${styles.income} ${styles.disabled}`
		: styles.income;

	const expenseClass = disabled
		? `${styles.expense} ${styles.disabled}`
		: styles.expense;

	return (
		<fieldset className={styles.fieldset}>
			<div className={styles.types}>
				<span
					className={
						selectedType === TYPE.income
							? `${incomeClass} ${styles.selected}`
							: incomeClass
					}
					onClick={() => handleType(TYPE.income)}
				>
					Income
				</span>

				<span
					className={
						selectedType === TYPE.expense
							? `${expenseClass} ${styles.selected}`
							: expenseClass
					}
					onClick={() => handleType(TYPE.expense)}
				>
					Expense
				</span>
			</div>
		</fieldset>
	);
};

export default TypeSelector;
