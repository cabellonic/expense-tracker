import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { navigate } from "@reach/router";
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
			const response = await fetch("http://localhost:5000/transactions", {
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
			});

			const resData = await response.json();
			// If credentials are invalid
			if (!resData.ok) return setErrorMessage(resData.message);
			navigate(`/transactions/${resData.transaction.id}`);
		} catch (err) {
			// HANDLE ERROR LATER
			console.log(err);
		}
	};

	const amountRegister = register("amount", { required: true });
	// const typeRegister = register("type", {
	register("type", {
		required: true,
		value: type,
	});
	const titleRegister = register("title", {
		required: true,
		minLength: 3,
		maxLength: 100,
	});
	const noteRegister = register("note");
	const categoryRegister = register("category", {
		required: true,
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

			<Fieldset>
				<Button type="submit">Add</Button>
			</Fieldset>
		</Form>
	);
};

export default AddTransactionForm;
