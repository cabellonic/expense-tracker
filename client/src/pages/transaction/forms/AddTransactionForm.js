import { useContext, useState } from "react";
import { navigate } from "@reach/router";
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
// Context
import { AuthContext } from "context/AuthContext";

const AddTransactionForm = ({ type = "expense" }) => {
	const [errorMessage, setErrorMessage] = useState();
	const { userToken } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const onSubmit = async (data) => {
		const { amount, type, title, note, category } = data;
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/transaction`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userToken}`,
					},
					body: JSON.stringify({
						amount,
						type,
						title,
						note,
						category,
					}),
				}
			);

			const resData = await response.json();
			// If credentials are invalid
			if (!resData.ok) return setErrorMessage(resData.message);
			navigate(`/transaction/${resData.transaction.id}`);
		} catch (err) {
			// HANDLE ERROR LATER
			console.log(err);
		}
	};

	const amountRegister = register("amount", {
		required: { value: true, message: "The amount is required" },
		min: { value: 1, message: "The amount must be greater than 0" },
		max: { value: 999999999, message: "Isn't that too much?" },
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
	});
	const noteRegister = register("note");
	const categoryRegister = register("category", {
		required: { value: true, message: "A category is required" },
	});

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<AmountInput register={amountRegister} error={errors.amount} />
			<TypeSelector setValue={setValue} type={type} />
			<Input
				register={titleRegister}
				placeholder="Title"
				error={errors.title}
			/>
			<Input register={noteRegister} placeholder="Note" error={errors.note} />
			<CategorySelector register={categoryRegister} setValue={setValue} />

			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			{errors.amount && <ErrorMessage>{errors.amount.message}</ErrorMessage>}
			{errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
			{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
			{errors.category && (
				<ErrorMessage>{errors.category.message}</ErrorMessage>
			)}

			<Fieldset>
				<Button type="submit">Add</Button>
			</Fieldset>
		</Form>
	);
};

export default AddTransactionForm;
