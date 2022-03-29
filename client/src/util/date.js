export const formatDate = (value, locale = "en-US") => {
	const date = new Date(value.split("-"));
	const config = {
		dateStyle: "full",
	};
	const formatter = new Intl.DateTimeFormat(locale, config);
	return formatter.format(date);
};

export const formatTimeAgo = (value, locale = "en-US") => {
	const dayInMilliseconds = 1000 * 60 * 60 * 24;
	const date = new Date(value.split("-"));
	const deltaDays = (date.getTime() - Date.now()) / dayInMilliseconds;
	const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
	const daysNumber = Math.round(deltaDays);

	if (daysNumber <= -365) {
		const yearsNumber = Math.round(daysNumber / 365);
		return formatter.format(yearsNumber, "years");
	}

	if (daysNumber <= -30) {
		const monthsNumber = Math.round(daysNumber / 30);
		return formatter.format(monthsNumber, "months");
	}

	return formatter.format(daysNumber, "days");
};
