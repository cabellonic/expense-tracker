import { useForm } from "react-hook-form";
// Components
import Form from "./form-elements/Form";
import AmountInput from "./form-elements/AmountInput";
import TypeSelector from "./form-elements/TypeSelector";
import Input from "./form-elements/Input";
import CategorySelector from "./form-elements/CategorySelector";
import Fieldset from "./form-elements/Fieldset";
import Button from "./form-elements/Button";

const EditTransactionForm = ({ transaction }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const { amount, type, title, note, category } = transaction;

	const onSubmit = (data) => console.log(data);

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
		value: category,
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
				category={category}
			/>

			<Fieldset>
				<Button type="submit" red>
					Remove
				</Button>
				<Button type="submit" green>
					Save
				</Button>
			</Fieldset>
		</Form>
	);
};

export default EditTransactionForm;
