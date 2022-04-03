import { useContext, useState } from "react";
import { navigate } from "@reach/router";
import { useForm } from "react-hook-form";
// Components
import Form from "components/ui/form-elements/Form";
import Input from "components/ui/form-elements/Input";
import Button from "components/ui/Button";
import Fieldset from "components/ui/form-elements/Fieldset";
import CategoryIcon from "components/ui/CategoryIcon";
import ErrorMessage from "components/ui/ErrorMessage";
import DeleteCategoryForm from "./DeleteCategoryForm";
// Context
import { AuthContext } from "context/AuthContext";
// Styles
import styles from "./EditCategoryForm.module.css";

const EditCategoryForm = ({ category }) => {
	const { userToken } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState();
	const { name } = category;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	const onSubmit = async (data) => {
		const { name } = data;
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/category/${category.slug}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userToken}`,
				},
				body: JSON.stringify({ name }),
			}
		);

		const resData = await response.json();
		// If credentials are invalid
		if (!resData.ok) return setErrorMessage(resData.message);
		navigate("/config/categories");
	};

	const nameRegister = register("name", {
		required: { value: true, message: "A name is required" },
		maxLength: {
			value: 25,
			message: "Title can't be longer than 25 characters",
		},
		value: name,
	});

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<figure className={styles.category_icon}>
				<CategoryIcon category={category.slug} />
			</figure>
			<Input
				register={nameRegister}
				placeholder="Category name"
				error={errors.name}
			/>

			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
			{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

			<Fieldset>
				<DeleteCategoryForm category={category} />
				<Button type="submit" green>
					Save
				</Button>
			</Fieldset>
		</Form>
	);
};

export default EditCategoryForm;
