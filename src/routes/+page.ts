import Cookies from "js-cookie";

// +page.ts

// +page.ts

import { redirect, type Load } from "@sveltejs/kit";

export const load: Load = async () => {
	if (Cookies.get("token")) {
		throw redirect(308, "/home");
	}

	return;
};
