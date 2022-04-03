import { useContext, useState } from "react";
import { navigate, useParams } from "@reach/router";
import { useForm } from "react-hook-form";
// Components
import Form from "components/ui/form-elements/Form";
import AmountInput from "components/ui/form-elements/AmountInput";
import TypeSelector from "components/ui/form-elements/TypeSelector";
import Input from "components/ui/form-elements/Input";
import CategorySelector from "components/ui/form-elements/CategorySelector";
import ErrorMessage from "components/ui/ErrorMessage";
import Fieldset from "components/ui/form-elements/Fieldset";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
// Context
import { AuthContext } from "context/AuthContext";

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
				`${process.env.REACT_APP_API_URL}/transaction/${transaction_id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
					body: JSON.stringify({
						amount,
						type,
					}),
				}
			);

			const resData = await response.json();
			// If credentials are invalid
			if (!resData.ok) {
				handleModal();
				return setErrorMessage(resData.message);
			}
			navigate(`/home`);
		} catch (err) {
			// HANDLE ERROR LATER
			console.log(err);
		}
	};

	const onSubmit = async (data) => {
		const { amount, title, note, category } = data;

		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/transaction/${transaction_id}`,
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
						type,
					}),
				}
			);

			const resData = await response.json();
			// If credentials are invalid
			if (!resData.ok) return setErrorMessage(resData.message);
			navigate(`/transaction/${resData.transaction_id}`);
		} catch (err) {
			// HANDLE ERROR LATER
			console.log(err);
		}
	};

	const amountRegister = register("amount", {
		required: { value: true, message: "The amount is required" },
		min: { value: 1, message: "The amount must be greater than 0" },
		max: { value: 999999999, message: "Isn't that too much?" },
		value: Math.abs(amount),
	});
	// const typeRegister = register("type", {
	register("type", {
		required: { value: true, message: "The type is required" },
		value: type,
	});
	const titleRegister = register("title", {
		required: { value: true, message: "A title is required" },
		maxLength: {
			value: 25,
			message: "The title can't be longer than 25 characters",
		},
		value: title,
	});
	const noteRegister = register("note", { value: note });
	const categoryRegister = register("category", {
		required: { value: true, message: "A category is required" },
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
			{errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}
			{errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
			{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
			{errors.category && (
				<ErrorMessage>{errors.category.message}</ErrorMessage>
			)}

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
