import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { navigate } from "@reach/router";
// Components
import Form from "components/ui/form-elements/Form";
import Input from "components/ui/form-elements/Input";
import Fieldset from "components/ui/form-elements/Fieldset";
import Button from "components/ui/Button";
import ErrorMessage from "components/ui/ErrorMessage";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./EditUserForm.module.css";
import Modal from "components/ui/Modal";

const EditUserForm = () => {
	const [errorMessage, setErrorMessage] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [userAvatar, setUserAvatar] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { userToken } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const firstNameRegister = register("firstName", {
		required: true,
		maxLength: 25,
	});

	const lastNameRegister = register("lastName", {
		maxLength: 25,
	});

	register("avatar", {
		required: true,
	});

	const handleModal = () => {
		setShowModal((prevState) => !prevState);
	};

	const handleAvatar = (index) => {
		setUserAvatar(`/avatar/Monster${index}.png`);
		setValue(`avatar`, `/avatar/Monster${index}.png`);
		handleModal();
	};

	const onSubmit = async (data) => {
		const { firstName, lastName, avatar } = data;

		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken}`,
				},
				body: JSON.stringify({ firstName, lastName, avatar }),
			});

			const resData = await response.json();
			// If credentials are invalid
			if (!resData.ok) return setErrorMessage(resData.message);

			navigate("/config");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			const resData = await response.json();
			if (!resData.ok) return setErrorMessage(resData.message);
			setValue("firstName", resData.user.first_name);
			setValue("lastName", resData.user.last_name);
			setValue("avatar", resData.user.avatar);
			setUserAvatar(resData.user.avatar);
			setIsLoading(false);
		};
		fetchData();
	}, [userToken, setValue]);

	if (isLoading) return <></>;

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<figure className={styles.user_avatar} onClick={handleModal}>
				{userAvatar && <img src={userAvatar} alt="avatar" />}
			</figure>
			{showModal && (
				<Modal
					title="Select your new avatar"
					className={styles.mini_avatar_list}
					onClose={handleModal}
				>
					{Array.from({ length: 24 }).map((_, index) => {
						return (
							<figure
								className={styles.mini_avatar}
								onClick={() => handleAvatar(index)}
								key={index}
							>
								<img src={`/avatar/Monster${index}.png`} alt="avatar" />
							</figure>
						);
					})}
				</Modal>
			)}

			<Input
				register={firstNameRegister}
				placeholder="First Name"
				error={errors.firstName}
			/>
			<Input
				register={lastNameRegister}
				placeholder="Last Name"
				error={errors.lastName}
			/>

			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

			<Fieldset>
				<Button type="submit" green>
					Save
				</Button>
			</Fieldset>
		</Form>
	);
};

export default EditUserForm;
