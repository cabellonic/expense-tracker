import { useForm } from "react-hook-form";
// Components
import Form from "components/ui/form/Form";
import AmountInput from "./form-elements/AmountInput";
import TypeSelector from "./form-elements/TypeSelector";
import Input from "components/ui/form/Input";
import CategorySelector from "./form-elements/CategorySelector";
import Fieldset from "components/ui/form/Fieldset";
import Button from "components/ui/Button";

const AddTransactionForm = ({ type = "expense" }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	const onSubmit = (data) => console.log(data);

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

			<Fieldset>
				<Button type="submit">Add</Button>
			</Fieldset>
		</Form>
	);
};

export default AddTransactionForm;
