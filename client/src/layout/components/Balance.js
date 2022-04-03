import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Util
import { formatAmount } from "util/currency";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./Balance.module.css";
import BalancePH from "components/placeholders/BalancePH";

const Balance = () => {
	const { userToken } = useContext(AuthContext);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (userToken) {
			const getUserData = async () => {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				});
				const resData = await response.json();
				setUserData(resData.user);
			};
			getUserData();
		}
	}, [userToken]);

	const [hideBalance, setHideBalance] = useState(
		localStorage.getItem("hideBalance") === "true"
	);

	const toggleBalance = () => {
		setHideBalance((prevState) => {
			localStorage.setItem("hideBalance", !prevState);
			return !prevState;
		});
	};

	const income = parseFloat(userData?.income) || 0;
	const expense = parseFloat(userData?.expense) || 0;

	return (
		<section className={styles.balance_wrapper}>
			<div className={styles.balance}>
				{!userData ? (
					<BalancePH />
				) : (
					<>
						<span className={styles.title}>Total balance</span>
						<span className={styles.amount}>
							{hideBalance ? "$＊＊＊＊" : formatAmount(expense + income)}

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
								<span>{hideBalance ? "$＊＊＊" : formatAmount(income)}</span>
							</div>
						</div>
						<div className={styles.balance_info}>
							<span className={styles.balance_icon}>
								<FontAwesomeIcon icon={["fas", "arrow-circle-down"]} />
							</span>
							<div className={styles.balance_expenses}>
								<span>Expenses</span>
								<span>{hideBalance ? "$＊＊＊" : formatAmount(expense)}</span>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default Balance;
