import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Util
import { formatAmount } from "util/currency";
// Styles
import styles from "./Balance.module.css";

const Balance = ({ amount = -93154 }) => {
	const [showBalance, setShowBalance] = useState(true);

	const toggleBalance = () => {
		setShowBalance((prevState) => !prevState);
	};

	return (
		<section className={styles.balance_wrapper}>
			<div className={styles.balance}>
				<span className={styles.title}>Total balance</span>
				<span className={styles.amount}>
					{showBalance ? formatAmount(amount) : "$＊＊＊＊"}

					{showBalance ? (
						<FontAwesomeIcon
							className={styles.amount_toggle}
							onClick={toggleBalance}
							icon={["fas", "eye"]}
						/>
					) : (
						<FontAwesomeIcon
							className={styles.amount_toggle}
							onClick={toggleBalance}
							icon={["fas", "eye-slash"]}
						/>
					)}
				</span>
				<div className={styles.balance_info}>
					<span className={styles.balance_icon}>
						<FontAwesomeIcon icon={["fas", "arrow-circle-up"]} />
					</span>
					<div className={styles.balance_incomes}>
						<span>Incomes</span>
						<span>{showBalance ? formatAmount(5701) : "$＊＊＊"}</span>
					</div>
				</div>
				<div className={styles.balance_info}>
					<span className={styles.balance_icon}>
						<FontAwesomeIcon icon={["fas", "arrow-circle-down"]} />
					</span>
					<div className={styles.balance_expenses}>
						<span>Expenses</span>
						<span>{showBalance ? formatAmount(-1504) : "$＊＊＊"}</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Balance;
