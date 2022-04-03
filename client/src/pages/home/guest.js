// Components
import Layout from "layout/Layout";
import HomeSlider from "./components/HomeSlider";
import Fieldset from "components/ui/form-elements/Fieldset";
import Button from "components/ui/Button";

const GuestHomePage = () => {
	return (
		<Layout pageTitle={"Welcome"} center>
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
