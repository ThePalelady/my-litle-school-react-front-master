export const datePickerOptions = {
	title: "Aniversário",
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	maxDate: new Date("2007-01-01"),
	minDate: new Date("2000-01-01"),
	theme: {
		background: "bg-gray-700",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "text-white",
		disabledText: "bg-gray-900",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <span>Ant.</span>,
		next: () => <span>Prox.</span>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date("2006-01-01"),
	language: "pt-br",
}

