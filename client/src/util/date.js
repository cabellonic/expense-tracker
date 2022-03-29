export const formatDate = (value, locale = "en-US") => {
	const date = new Date(value.split("-"));
	const config = {
		dateStyle: "full",
	};
	const formatter = new Intl.DateTimeFormat(locale, config);
	return formatter.format(date);
};

export const formatDaysAgo = (value, locale = "en-US") => {
	const dayInMilliseconds = 1000 * 60 * 60 * 24;
	const date = new Date(value.split("-"));
	const deltaDays = (date.getTime() - Date.now()) / dayInMilliseconds;
	const formatter = new Intl.RelativeTimeFormat(locale);
	return formatter.format(Math.round(deltaDays), "days");
};
