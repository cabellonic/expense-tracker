import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Util
import { formatAmount } from "util/currency";
// Styles
import styles from "./Balance.module.css";

const Balance = ({ amount = -93154 }) => {
	const [hideBalance, setHideBalance] = useState(
		localStorage.getItem("hideBalance") === "true"
	);

	const toggleBalance = () => {
		setHideBalance((prevState) => {
			localStorage.setItem("hideBalance", !prevState);
			return !prevState;
		});
	};

	return (
		<section className={styles.balance_wrapper}>
			<div className={styles.balance}>
				<span className={styles.title}>Total balance</span>
				<span className={styles.amount}>
					{hideBalance ? "$＊＊＊＊" : formatAmount(amount)}

					{hideBalance ? (
						<FontAwesomeIcon
							className={styles.amount_toggle}
							onClick={toggleBalance}
							icon={["fas", "eye-slash"]}
						/>
					) : (
						<FontAwesomeIcon
							className={styles.amount_toggle}
							onClick={toggleBalance}
							icon={["fas", "eye"]}
						/>
					)}
				</span>
				<div className={styles.balance_info}>
					<span className={styles.balance_icon}>
						<FontAwesomeIcon icon={["fas", "arrow-circle-up"]} />
					</span>
					<div className={styles.balance_incomes}>
						<span>Incomes</span>
						<span>{hideBalance ? "$＊＊＊" : formatAmount(5701)}</span>
					</div>
				</div>
				<div className={styles.balance_info}>
					<span className={styles.balance_icon}>
						<FontAwesomeIcon icon={["fas", "arrow-circle-down"]} />
					</span>
					<div className={styles.balance_expenses}>
						<span>Expenses</span>
						<span>{hideBalance ? "$＊＊＊" : formatAmount(-1504)}</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Balance;
