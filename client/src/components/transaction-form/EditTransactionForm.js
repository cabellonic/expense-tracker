import { useContext, useState } from "react";
import { navigate, useParams } from "@reach/router";
import { useForm } from "react-hook-form";
// Components
import Form from "components/ui/form/Form";
import AmountInput from "./form-elements/AmountInput";
import TypeSelector from "./form-elements/TypeSelector";
import Input from "components/ui/form/Input";
import CategorySelector from "./form-elements/CategorySelector";
import ErrorMessage from "components/ui/form/ErrorMessage";
import Fieldset from "components/ui/form/Fieldset";
import Button from "components/ui/Button";
// Context
import { AuthContext } from "context/AuthContext";
import Modal from "components/ui/Modal";

const EditTransactionForm = ({ transaction }) => {
	const [errorMessage, setErrorMessage] = useState();
	const [showModal, setShowModal] = useState();
	const { userToken } = useContext(AuthContext);
	const { transaction_id } = useParams();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const { amount, type, title, note, category_slug, category_name } =
		transaction;

	const handleModal = () => {
		setShowModal((prevState) => !prevState);
	};

	const handleDelete = async () => {
		try {
			const response = await fetch(
				`http://localhost:5000/transactions/${transaction_id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
				}
			);

			const resData = await response.json();
			console.log(resData);
			// If credentials are invalid
			if (!resData.ok) {
				handleModal();
				return setErrorMessage(resData.message);
			}
			navigate(`/`);
		} catch (err) {
			// HANDLE ERROR LATER
			console.log(err);
		}
	};

	const onSubmit = async (data) => {
		const { amount, title, note, category } = data;

		try {
			const response = await fetch(
				`http://localhost:5000/transactions/${transaction_id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
					body: JSON.stringify({
						amount,
						title,
						note,
						category,
					}),
				}
			);

			const resData = await response.json();
			// If credentials are invalid
			if (!resData.ok) return setErrorMessage(resData.message);
			navigate(`/transactions/${resData.transaction_id}`);
		} catch (err) {
			// HANDLE ERROR LATER
			console.log(err);
		}
	};

	const amountRegister = register("amount", {
		required: true,
		value: Math.abs(amount),
	});
	// const typeRegister = register("type", {
	register("type", {
		required: true,
		value: type,
	});
	const titleRegister = register("title", {
		required: true,
		minLength: 3,
		maxLength: 100,
		value: title,
	});
	const noteRegister = register("note", { value: note });
	const categoryRegister = register("category", {
		required: true,
		value: category_slug,
	});

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<AmountInput register={amountRegister} error={errors.amount} />
			<TypeSelector setValue={setValue} type={type} disabled />
			<Input
				register={titleRegister}
				placeholder="Title"
				error={errors.title}
			/>
			<Input register={noteRegister} placeholder="Note" error={errors.note} />
			<CategorySelector
				register={categoryRegister}
				setValue={setValue}
				category={{ slug: category_slug, name: category_name }}
			/>

			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

			<Fieldset>
				<Button onClick={handleModal} red>
					Remove
				</Button>
				{showModal && (
					<Modal onClose={handleModal} title="Are you sure?">
						<div
							style={{
								display: "flex",
								flexFlow: "column",
								textAlign: "center",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							Are you sure you want to delete the transaction? <br />
							This action cannot be reversed!
							<Button onClick={handleDelete} red>
								I'm sure
							</Button>
						</div>
					</Modal>
				)}
				<Button type="submit" green>
					Save
				</Button>
			</Fieldset>
		</Form>
	);
};

export default EditTransactionForm;
