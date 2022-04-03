import { useContext, useState } from "react";
import { navigate } from "@reach/router";
import { useForm } from "react-hook-form";
// Components
import Form from "components/ui/form-elements/Form";
import Input from "components/ui/form-elements/Input";
import Button from "components/ui/Button";
import Fieldset from "components/ui/form-elements/Fieldset";
import ErrorMessage from "components/ui/ErrorMessage";
// Context
import { AuthContext } from "context/AuthContext";

const AddCategoryForm = () => {
	const { userToken } = useContext(AuthContext);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	const onSubmit = async (data) => {
		const { name } = data;
		setIsSubmitting(true);

		const response = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userToken}`,
			},
			body: JSON.stringify({ name }),
		});

		const resData = await response.json();
		// If credentials are invalid
		setIsSubmitting(false);
		if (!resData.ok) return setErrorMessage(resData.message);
		navigate("/config/categories");
	};

	const nameRegister = register("name", {
		required: { value: true, message: "A name is required" },
		maxLength: {
			value: 25,
			message: "Title can't be longer than 25 characters",
		},
	});

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Input
				register={nameRegister}
				placeholder="Category name"
				error={errors.name}
			/>

			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

			<Fieldset>
				<Button type="submit" green disabled={isSubmitting}>
					Create
				</Button>
			</Fieldset>
		</Form>
	);
};

export default AddCategoryForm;
