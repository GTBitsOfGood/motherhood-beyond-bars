import { FocusEvent } from "react";

export default function keyboardScroll(e: FocusEvent) {
	e.target.scrollIntoView({
		behavior: 'smooth',
		block: 'center',
		inline: 'center'
	})
}
