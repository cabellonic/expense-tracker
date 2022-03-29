import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faEye,
	faEyeSlash,
	faArrowLeft,
	faCircleArrowDown,
	faCircleArrowUp,
	faFilterCircleDollar,
	faPlus,
	faCirclePlus,
	faMinus,
	faMinusCircle,
	faGear,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

// Expense Tracker Categories

import {
	faBurger, // Food
	faDollarSign, // Salary
	faFootball, // Sport
	faBagShopping, // Shopping
	faTv, // VOD
	faTaxi, // Travel
	faCarBurst, // Insurance
	faBriefcaseMedical, // Healthcare
	faMoneyCheckDollar, // Bills
	faDumbbell, // GYM
	faShirt, // Clothes
	faGraduationCap, // Education
	faGift, // Gift
	faCouch, // Furniture & Decor
	faGamepad, // Gaming
	faTags, // Custom category
} from "@fortawesome/free-solid-svg-icons";

export const registerIcons = () => {
	library.add(
		faEye,
		faDollarSign,
		faEyeSlash,
		faArrowLeft,
		faCircleArrowDown,
		faCircleArrowUp,
		faFilterCircleDollar,
		faPlus,
		faCirclePlus,
		faMinus,
		faMinusCircle,
		faGear,
		faBurger,
		faFootball,
		faBagShopping,
		faTv,
		faTaxi,
		faCarBurst,
		faBriefcaseMedical,
		faMoneyCheckDollar,
		faDumbbell,
		faShirt,
		faGraduationCap,
		faGift,
		faCouch,
		faGamepad,
		faTags,
		faXmark
	);
};
