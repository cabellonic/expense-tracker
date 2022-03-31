import Button from "components/ui/Button";
import Fieldset from "components/ui/form/Fieldset";
import Layout from "layout/Layout";
import HomeSlider from "./components/HomeSlider";

const GuestHomePage = () => {
	return (
		<Layout pageTitle={"Expense Tracker"} center>
			<HomeSlider />
			<Fieldset>
				<Button href={"/login"}>Login</Button>
				<Button href={"/singup"} green>
					Create account
				</Button>
			</Fieldset>
		</Layout>
	);
};

export default GuestHomePage;
